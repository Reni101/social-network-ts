import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { handleAsyncServerNetworkError, handleServerAppError } from '../utils/error-utils'
import { profileAPI } from '../api/profile-api'
import { ResultCodeEnum } from '../api/api'
import { ProfileType } from './types'

export const getProfileTC = createAsyncThunk(
	'profileReducer/getProfileTC',
	async (param: { userid: string }, { dispatch, rejectWithValue }) => {
		try {
			return await profileAPI.getProfile(param.userid)
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const getStatusTC = createAsyncThunk(
	'profileReducer/getStatusTC',
	async (param: { userid: string }, { dispatch, rejectWithValue }) => {
		try {
			return await profileAPI.getStatus(param.userid)
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const updateStatusTC = createAsyncThunk(
	'profileReducer/updateStatusTC',
	async (param: { status: string }, { dispatch, rejectWithValue }) => {
		try {
			await profileAPI.updateStatus(param.status)
			return { status: param.status }
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)

export const savePhotoTC = createAsyncThunk(
	'profileReducer/savePhotoTC',
	async (param: { file: File }, { dispatch, rejectWithValue }) => {
		try {
			const res = await profileAPI.savePhoto(param.file)
			if (res.resultCode === ResultCodeEnum.Success) {
				return { photos: res.data.photos }
			} else {
				return handleServerAppError(res.messages, dispatch, rejectWithValue)
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

const slice = createSlice({
	name: 'profileReducer',
	initialState: {
		profile: null as ProfileType | null,
		status: '' as string
	},
	reducers: {
		setUserProfileAC(state, action: PayloadAction<{ profile: ProfileType }>) {
			state.profile = action.payload.profile
		}
	},
	extraReducers: builder =>
		builder
			.addCase(getProfileTC.fulfilled, (state, action) => {
				state.profile = action.payload
			})
			.addCase(getStatusTC.fulfilled, (state, action) => {
				state.status = action.payload
			})
			.addCase(updateStatusTC.fulfilled, (state, action) => {
				state.status = action.payload.status
			})
			.addCase(savePhotoTC.fulfilled, (state, action) => {
				state.profile!.photos = action.payload.photos
			})
})

export const profileReducer = slice.reducer
