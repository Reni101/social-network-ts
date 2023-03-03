import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { handleAsyncServerNetworkError } from '../utils/error-utils'
import {
	addMessageRes,
	dialogsAPI,
	messageItems,
	ResMessagesUser,
	ResUsersDialogs
} from '../api/dialogs-api'
import { ResponseType } from '../api/api'
import { setAppStatus } from './app-reducer'

export const getAllDialogsTC = createAsyncThunk(
	'dialogsReducer/getAllDialogsTC',
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(setAppStatus('loading'))
		try {
			const res = await dialogsAPI.getAllDialogs()
			dispatch(setAppStatus('succeeded'))
			return res
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const sendMessageTC = createAsyncThunk<
	ResponseType<{ message: addMessageRes }>,
	{ userId: number; message: string }
>('dialogsReducer/sendMessageTC', async (param, { dispatch, rejectWithValue }) => {
	dispatch(setAppStatus('loading'))
	try {
		const res = await dialogsAPI.sendMessage(param.userId, param.message)
		dispatch(setAppStatus('succeeded'))
		return res
	} catch (e) {
		return handleAsyncServerNetworkError(
			e as Error | AxiosError,
			dispatch,
			rejectWithValue
		)
	}
})

export const getMessagesFromUserTC = createAsyncThunk<
	ResMessagesUser,
	{ userId: number },
	{ state: any }
>(
	'dialogsReducer/getMessagesFromUserTC',
	async (param, { dispatch, getState, rejectWithValue }) => {
		try {
			const currentPage = getState().dialogs.userMessages.currentPage
			const res = await dialogsAPI.getMessagesFromUser(param.userId, currentPage)
			dispatch(incrementCurrentPageAC())
			return res
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)
export const startNewDialogs = createAsyncThunk(
	'dialogsReducer/startNewDialogs',
	async (param: { userId: number }, { dispatch, rejectWithValue }) => {
		try {
			await dialogsAPI.startDialogs(param.userId)
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

const slice = createSlice({
	name: 'dialogsReducer',
	initialState: {
		dialogsData: [] as ResUsersDialogs[],
		userMessages: {
			items: [] as messageItems[],
			totalCount: 0,
			currentPage: 1
		}
	},
	reducers: {
		clearUserMessagesAC(state) {
			state.userMessages.items = []
			state.userMessages.totalCount = 0
			state.userMessages.currentPage = 1
		},
		incrementCurrentPageAC(state) {
			state.userMessages.currentPage++
		}
	},
	extraReducers: builder =>
		builder
			.addCase(getAllDialogsTC.fulfilled, (state, action) => {
				state.dialogsData = action.payload
			})

			.addCase(getMessagesFromUserTC.fulfilled, (state, action) => {
				state.userMessages.items = [
					...action.payload.items,
					...state.userMessages.items
				]
				state.userMessages.totalCount = action.payload.totalCount
			})

			.addCase(sendMessageTC.fulfilled, (state, action) => {
				const {
					recipientName,
					deletedBySender,
					deletedByRecipient,
					isSpam,
					distributionId,
					...newMessage
				} = action.payload.data.message

				state.userMessages.items.push(newMessage)
			})
})

export const dialogsReducer = slice.reducer
export const { clearUserMessagesAC, incrementCurrentPageAC } = slice.actions
