import { Dispatch } from 'redux'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatAPI, StatusType } from '../api/chat-ws-api'
import { ChatMessageType } from './types'

export const startMessagesListeningTC = createAsyncThunk(
	'chatWSReducer/startMessagesListeningTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			chatAPI.start()
			chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
			chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
			return
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const stopMessagesListeningTC = createAsyncThunk(
	'',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
			chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
			chatAPI.stop()
			return
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'chatWSReducer',
	initialState: {
		messages: [] as ChatMessageType[],
		status: 'pending' as StatusType
	},
	reducers: {
		setMessagesAC(state, action: PayloadAction<{ messages: ChatMessageType[] }>) {
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages]
			}
		},
		statusChangedAC(state, action: PayloadAction<{ status: StatusType }>) {
			state.status = action.payload.status
		}
	},
	extraReducers: builder =>
		builder.addCase(stopMessagesListeningTC.fulfilled, state => {
			state.messages = []
		})
})
export const chatWSReducer = slice.reducer
export const { setMessagesAC, statusChangedAC } = slice.actions

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = messages => {
			dispatch(setMessagesAC({ messages }))
		}
	}
	return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = status => {
			dispatch(statusChangedAC({ status }))
		}
	}
	return _statusChangedHandler
}

export const sendMessage = (message: string) => {
	chatAPI.sendMessage(message)
}
