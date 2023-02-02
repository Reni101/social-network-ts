import {v1} from "uuid";
import {PostsType} from "./Types";
import {profileAPI} from "../api/api";
import {AppThunk} from "./Redux-store";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";


export type initialStateType = typeof initialState

export type PostsDataType = {
    id: string
    message: string
    likeCount: number
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: null | string

}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null | undefined
    large: string | null | undefined

}


let initialState = {
    postsData: [
        {id: v1(), message: "In progress...", likeCount: 0},
    ] as Array<PostsDataType>,

    profile: null as ProfileType | null,
    status: ""

}
export type ActionsProfileType =
    | ReturnType<typeof savePhotoSuccessAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof addPostAC>

export const ProfileReducer = (state = initialState, action: ActionsProfileType): initialStateType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: PostsType = {
                id: v1(),
                message: action.text,
                likeCount: 0,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],

            }
        }
        case "SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET_STATUS": {
            return {...state, status: action.status}
        }
        case "SAVE_PHOTO_SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        default:
            return state

    }
};

//========================Action Creator======================

export const addPostAC = (text: string) => ({type: ADD_POST, text} as const)
export const setUserProfileAC = (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)
export const setStatusAC = (status: string) => ({
    type: SET_STATUS,
    status
} as const)
export const savePhotoSuccessAC = (photos: PhotosType) => ({
    type: 'SAVE_PHOTO_SUCCESS',
    photos
} as const)

//========================Thunk Creator======================

export const getProfileTC = (userid: string): AppThunk => async dispatch => {
    let response = await profileAPI.getProfile(userid)
    dispatch(setUserProfileAC(response.data))
}

export const getStatusTC = (userid: string): AppThunk => async dispatch => {
    let response = await profileAPI.getStatus(userid)
    dispatch(setStatusAC(response.data))

}

export const updateStatusTC = (status: string): AppThunk => async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }

}

export const savePhotoTC = (file: any): AppThunk => async dispatch => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }

}






