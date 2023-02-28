import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { dialogsAPI, messageItems, userDialog } from '../api/api'

export const getAllDialogsTC = createAsyncThunk('getAllDialogs', async (_, thunkAPI) => {
	const res = await dialogsAPI.getAllDialogs()
	return res
})

export const sendMessageTC = createAsyncThunk(
	'sendMessage',
	async (param: { userId: number; message: string }, thunkAPI) => {
		const res = await dialogsAPI.sendMessage(param.userId, param.message)
		return res
	}
)
export const getAllMessagesTC = createAsyncThunk(
	'getMessagesFromUser',
	async (param: { userId: number }, thunkAPI) => {
		const res = await dialogsAPI.getMessagesFromUser(param.userId)
		return res
	}
)
export const showMoreMessagesTC = createAsyncThunk(
	'showMoreMessagesTC',
	async (param: { userId: number; page: number }) => {
		const res = await dialogsAPI.getMessagesFromUser(param.userId, param.page)
		return res
	}
)

const slice = createSlice({
	name: 'dialogsReducer',
	initialState: {
		dialogsData: [] as userDialog[],
		userMessages: {
			items: [] as messageItems[],
			totalCount: 0 as number
		}
	},
	reducers: {
		clearUserMessagesAC(state) {
			state.userMessages.items = []
			state.userMessages.totalCount = 0
		}
	},
	extraReducers: builder =>
		builder
			.addCase(getAllDialogsTC.fulfilled, (state, action) => {
				state.dialogsData = action.payload
			})
			.addCase(getAllMessagesTC.fulfilled, (state, action) => {
				state.userMessages.items = action.payload.items
				state.userMessages.totalCount = action.payload.totalCount
			})
			.addCase(sendMessageTC.fulfilled, (state, action) => {
				const newMessage: messageItems = {
					body: action.payload.data.message.body,
					id: action.payload.data.message.id,
					translatedBody: action.payload.data.message.translatedBody,
					addedAt: action.payload.data.message.addedAt,
					senderId: action.payload.data.message.senderId,
					senderName: action.payload.data.message.senderName,
					recipientId: action.payload.data.message.recipientId,
					viewed: action.payload.data.message.viewed
				}
				state.userMessages.items.push(newMessage)
			})
			.addCase(showMoreMessagesTC.fulfilled, (state, action) => {
				state.userMessages.items = [
					...action.payload.items,
					...state.userMessages.items
				]
			})
})

export const dialogsReducer = slice.reducer
export const { clearUserMessagesAC } = slice.actions
