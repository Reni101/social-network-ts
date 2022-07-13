import {v1} from "uuid";
import {
    ActionsTypes,
    PostsType,
    setUserProfileActinoType,
    UpdateNewPostTextPostActionType
} from "./Store";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";


export type initialStateType = typeof initialState

type PostsDataType = {
    id: string
    message: string
    likeCount: number
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string

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
        case ADD_POST: {
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
        case UPDATE_NEW_POST_TEXT : {
            return {...state, newPostText: action.newText}
        }
        case "SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        default:
            return state

    }
};


export type AddPostActionType = {
    type: "ADD-POST",
}
export const addPostAC = (): AddPostActionType => ({type: ADD_POST})
export const updateNewPostAC = (text: string): UpdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})
export const setUserProfileAC = (profile: ProfileType): setUserProfileActinoType => ({
    type: SET_USER_PROFILE,
    profile
})

export default ProfileReducer;

