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
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getAllDialogsTC.fulfilled, (state, action) => {
				state.dialogsData = action.payload
			})
			.addCase(getAllMessagesTC.fulfilled, (state, action) => {
				state.userMessages.items = action.payload.items
				state.userMessages.totalCount = action.payload.totalCount
			})
			.addCase(sendMessageTC.fulfilled, (state, action) => {})
})

export const dialogsReducer = slice.reducer
