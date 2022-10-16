import {v1} from "uuid";
import {
    ActionsTypes,
    PostsType,

} from "./Types";
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
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null | undefined
    large: string | undefined

}


let initialState = {
    postsData: [
        {id: v1(), message: "My first post", likeCount: 0},
    ] as Array<PostsDataType>,
    profile: null as ProfileType | null,
    status: ""

}

export const ProfileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
        default:
            return state

    }
};

//========================Action Creator======================
export type addPostActionType = {
    type: "ADD-POST",
    text: string
}
export const addPostAC = (text: string): addPostActionType => ({type: ADD_POST, text})


export type setUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})

export type setStatusActionType = {
    type: "SET_STATUS"
    status: string
}
export const setStatusAC = (status: string): setStatusActionType => ({
    type: SET_STATUS,
    status
})


//========================Thunk======================
export const getProfileThunkCreator = (userid: string): AppThunk => async dispatch => {
    let response = await profileAPI.getProfile(userid)
    dispatch(setUserProfileAC(response.data))
}


export const getStatusThunkCreator = (userid: string): AppThunk => async dispatch => {
    let response = await profileAPI.getStatus(userid)
    dispatch(setStatusAC(response.data))

}

export const updateStatusThunkCreator = (status: string): AppThunk => async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }

}




