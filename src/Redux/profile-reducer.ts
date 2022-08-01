import {v1} from "uuid";
import {
    ActionsTypes,
    PostsType,

} from "./Types";
import {Dispatch} from "react";
import {usersAPI} from "../api/api";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";


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
    aboutMe?:null |string

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
    large: string  |undefined

}


let initialState = {
    postsData: [
        {id: v1(), message: "My first post", likeCount: 0},
    ] as Array<PostsDataType>,
    newPostText: "",
    profile: null as ProfileType | null,

}

const ProfileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: PostsType = {
                id: v1(),
                message: state.newPostText,
                likeCount: 0,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ""
            }
        }
        case "UPDATE-NEW-POST-TEXT" : {
            return {...state, newPostText: action.newText}
        }
        case "SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        default:
            return state

    }
};

//========================Action Creator======================
export type AddPostActionType = {
    type: "ADD-POST",
}
export const addPostAC = (): AddPostActionType => ({type: ADD_POST})

export type UpdateNewPostTextPostActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
export const updateNewPostAC = (text: string): UpdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})


export type setUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})



//========================Thunk======================
export const getProfileThunkCreator = (userid: string) => {
    return (dispatch:Dispatch<ActionsTypes>) => {
        usersAPI.getProfile(userid)
            .then(response => {
               dispatch(setUserProfileAC(response.data))
            });
    }
}

export default ProfileReducer;

