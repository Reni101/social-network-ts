import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from '../api/api'
import { FilterType, UserType } from './types'

export const getUsersTC = createAsyncThunk(
	'usersReducer/getUsersTC',
	async (
		param: { currentPage: number; pageSize: number; filter: FilterType },
		{ rejectWithValue }
	) => {
		try {
			if (!param.filter.friend) param.filter.friend = null
			const res = await usersAPI.getUsers(
				param.currentPage,
				param.pageSize,
				param.filter
			)

			return {
				...res,
				currentPage: param.currentPage,
				currentPageSize: param.pageSize
			}
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const followTC = createAsyncThunk(
	'usersReducer/followTC',
	async (param: { userId: number }, { rejectWithValue }) => {
		try {
			await usersAPI.followUser(param.userId)
			return param.userId
		} catch (e) {
			return rejectWithValue('')
		}
	}
)
export const unfollowTC = createAsyncThunk(
	'usersReducer/unfollowTC',
	async (param: { userId: number }, { rejectWithValue }) => {
		try {
			await usersAPI.unfollowUser(param.userId)
			return param.userId
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'usersReducer',
	initialState: {
		users: [] as UserType[],
		pageSize: 10,
		totalItemsCount: 1,
		currentPage: 1,
		followingInProgress: [] as number[]
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getUsersTC.fulfilled, (state, action) => {
				state.currentPage = action.payload.currentPage
				state.pageSize = action.payload.currentPageSize
				state.users = action.payload.items
				state.totalItemsCount = action.payload.totalCount
			})
			.addCase(followTC.fulfilled, (state, action) => {
				const index = state.users.findIndex(el => el.id === action.payload)
				state.users[index] = { ...state.users[index], followed: true }
			})
			.addCase(unfollowTC.fulfilled, (state, action) => {
				const index = state.users.findIndex(el => el.id === action.payload)
				state.users[index] = { ...state.users[index], followed: false }
			})
})

export const usersReducer = slice.reducer

export type initialUsersStateType = ReturnType<typeof slice.getInitialState>
