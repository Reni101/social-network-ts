import {v1} from "uuid";
import {ActionsTypes, AddPostActionType, PostsType, ProfilePageType, UpdateNewPostTextPostActionType} from "./Store";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";


let initialState = {
    postsData: [
        {id: v1(), message: "My first post", likeCount: 0},
    ],
    newPostText: "",

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
        default:
            return state

    }
};

export const addPostCreator = (): AddPostActionType => ({type: ADD_POST})
export const UpdateNewPostCreator = (text: string): UpdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})

export default ProfileReducer;

