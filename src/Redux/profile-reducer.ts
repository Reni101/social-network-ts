import {v1} from "uuid";
import {
    ActionsTypes,
    AddPostActionType,
    PostsType,
    ProfilePageType,
    setUserProfileActinoType,
    UpdateNewPostTextPostActionType
} from "./Store";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState:ProfilePageType = {
    postsData: [
        {id: v1(), message: "My first post", likeCount: 0},
    ],
    newPostText: "",
    profile:null,

}

const ProfileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: v1(),
                message: state.newPostText,
                likeCount: 0,
            };
            return{
                ...state,
                postsData: [...state.postsData,newPost],
                newPostText: ""
            }
        }
        case UPDATE_NEW_POST_TEXT : {
            return {...state,newPostText:action.newText}
        }
        case "SET_USER_PROFILE": {
            return {...state,profile:action.profile}
        }
        default:
            return state

    }
};

export const addPostAC = (): AddPostActionType => ({type: ADD_POST})
export const updateNewPostAC = (text: string): UpdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})
export const setUserProfileAC = (profile:any):setUserProfileActinoType => ({
    type: SET_USER_PROFILE,
    profile
})

export default ProfileReducer;

