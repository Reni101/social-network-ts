import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { dialogsAPI, messageItems, ResponseMessagesUser, usersDialog } from '../api/api'

export const getAllDialogsTC = createAsyncThunk(
	'dialogsReducer/getAllDialogsTC',
	async () => {
		return await dialogsAPI.getAllDialogs()
	}
)

export const sendMessageTC = createAsyncThunk(
	'dialogsReducer/sendMessageTC',
	async (param: { userId: number; message: string }) => {
		return await dialogsAPI.sendMessage(param.userId, param.message)
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
			const currentPage = getState().dialogsPage.userMessages.currentPage
			const res = await dialogsAPI.getMessagesFromUser(param.userId, currentPage)
			dispatch(incrementCurrentPage())
			return res
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'dialogsReducer',
	initialState: {
		dialogsData: [] as usersDialog[],
		userMessages: {
			items: [] as messageItems[],
			totalCount: 0 as number,
			currentPage: 1 as number
		}
	},
	reducers: {
		clearUserMessagesAC(state) {
			state.userMessages.items = []
			state.userMessages.totalCount = 0
			state.userMessages.currentPage = 1
		},
		incrementCurrentPage(state) {
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
export const { clearUserMessagesAC, incrementCurrentPage } = slice.actions
