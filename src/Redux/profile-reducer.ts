import { v1 } from 'uuid'
import { PhotosType, PostsDataType, PostsType, ProfileType } from './Types'
import { profileAPI } from '../api/api'
import { AppDispatch } from './Redux-store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
		addPostAC(state, action: PayloadAction<{ text: string }>) {
			let newPost: PostsType = {
				id: v1(),
				message: action.payload.text,
				likeCount: 0
			}
			state.postsData = [...state.postsData, newPost]
		},
		setUserProfileAC(
			state,
			action: PayloadAction<{ profile: ProfileType }>
		) {
			state.profile = action.payload.profile
		},
		setStatusAC(state, action: PayloadAction<{ status: string }>) {
			state.status = action.payload.status
		},
		savePhotoSuccessAC(
			state,
			action: PayloadAction<{ photos: PhotosType }>
		) {
			state.profile!.photos = action.payload.photos
		}
	}
})

export const profileReducer = slice.reducer
export const { addPostAC, setUserProfileAC, setStatusAC, savePhotoSuccessAC } =
	slice.actions

//========================Thunk Creator======================

export const getProfileTC =
	(userid: string) => async (dispatch: AppDispatch) => {
		let response = await profileAPI.getProfile(userid)
		dispatch(setUserProfileAC({ profile: response.data }))
	}

export const getStatusTC =
	(userid: string) => async (dispatch: AppDispatch) => {
		let response = await profileAPI.getStatus(userid)
		dispatch(setStatusAC({ status: response.data }))
	}

export const updateStatusTC =
	(status: string) => async (dispatch: AppDispatch) => {
		let response = await profileAPI.updateStatus(status)
		if (response.data.resultCode === 0) {
			dispatch(setStatusAC({ status: status }))
		}
	}

export const savePhotoTC = (file: File) => async (dispatch: AppDispatch) => {
	let response = await profileAPI.savePhoto(file)
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccessAC({ photos: response.data.data.photos }))
	}
}
