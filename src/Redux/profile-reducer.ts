import { v1 } from 'uuid'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileAPI } from '../api/api'
import { PostsDataType, ProfileType } from './types'

export const getProfileTC = createAsyncThunk(
	'profileReducer/getProfileTC',
	async (param: { userid: string }, { rejectWithValue }) => {
		try {
			return await profileAPI.getProfile(param.userid)
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const getStatusTC = createAsyncThunk(
	'profileReducer/getStatusTC',
	async (param: { userid: string }, { rejectWithValue }) => {
		try {
			return await profileAPI.getStatus(param.userid)
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const updateStatusTC = createAsyncThunk(
	'profileReducer/updateStatusTC',
	async (param: { status: string }, { rejectWithValue }) => {
		try {
			await profileAPI.updateStatus(param.status)
			return { status: param.status }
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const savePhotoTC = createAsyncThunk(
	'profileReducer/savePhotoTC',
	async (param: { file: File }, { rejectWithValue }) => {
		try {
			const response = await profileAPI.savePhoto(param.file)
			return { photos: response.data.photos }
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'profileReducer',
	initialState: {
		postsData: [
			{ id: v1(), message: 'In progress...', likeCount: 0 }
		] as Array<PostsDataType>,

		profile: null as ProfileType | null,
		status: ''
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
