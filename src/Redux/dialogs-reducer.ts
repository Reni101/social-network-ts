import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { dialogsAPI, messageItems, ResponseMessagesUser, usersDialogs } from '../api/api'
import { handleAsyncServerNetworkError } from '../utils/error-utils'

export const getAllDialogsTC = createAsyncThunk(
	'dialogsReducer/getAllDialogsTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			return await dialogsAPI.getAllDialogs()
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const sendMessageTC = createAsyncThunk(
	'dialogsReducer/sendMessageTC',
	async (param: { userId: number; message: string }, { dispatch, rejectWithValue }) => {
		try {
			return await dialogsAPI.sendMessage(param.userId, param.message)
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const getMessagesFromUserTC = createAsyncThunk<
	ResponseMessagesUser,
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

const slice = createSlice({
	name: 'dialogsReducer',
	initialState: {
		dialogsData: [] as usersDialogs[],
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
