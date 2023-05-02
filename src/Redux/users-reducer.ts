import { createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleAsyncServerNetworkError } from 'utils/error-utils'
import { getUsersResponseType, usersAPI, usersQueryParams } from 'api/users-api'
import { UserType } from './types'

type returnedGetUsers = getUsersResponseType & {
	currentPage: number
	currentPageSize: number
}

export const getUsersTC = createAppAsyncThunk<returnedGetUsers, usersQueryParams>(
	'usersReducer/getUsersTC',
	async (params, { dispatch, rejectWithValue }) => {
		try {
			if (!params.friend) params.friend = null
			const res = await usersAPI.getUsers(params)

			return {
				...res,
				currentPage: params.page,
				currentPageSize: params.count
			}
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)
export const followTC = createAppAsyncThunk<number, { userId: number }>(
	'usersReducer/followTC',
	async (param, { dispatch, rejectWithValue }) => {
		try {
			await usersAPI.followUser(param.userId)
			return param.userId
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)
export const unfollowTC = createAppAsyncThunk<number, { userId: number }>(
	'usersReducer/unfollowTC',
	async (param, { dispatch, rejectWithValue }) => {
		try {
			await usersAPI.unfollowUser(param.userId)
			return param.userId
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
	name: 'usersReducer',
	initialState: {
		users: [] as UserType[],
		pageSize: 10,
		totalItemsCount: 1,
		currentPage: 1,
		followingInProgress: [] as number[]
	},
	reducers: {},
	extraReducers: builder => {
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
	}
})

export const usersReducer = slice.reducer

export type initialUsersStateType = ReturnType<typeof slice.getInitialState>
