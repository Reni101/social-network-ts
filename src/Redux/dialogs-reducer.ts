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
	'getAllMessage',
	async (param: { userId: number }, thunkAPI) => {
		const res = await dialogsAPI.getAllMessages(param.userId)
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
})

export const dialogsReducer = slice.reducer
export const { clearUserMessagesAC } = slice.actions
