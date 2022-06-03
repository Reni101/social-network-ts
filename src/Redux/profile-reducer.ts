import {v1} from "uuid";
import {ActionsTypes, AddPostActionType, PostsType, ProfilePageType, UpdateNewPostTextPostActionType} from "./State";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";

const ProfileReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: v1(),
                message: state.newPostText,
                likeCount: 0,
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;

        case UPDATE_NEW_POST_TEXT :
            state.newPostText = action.newText;
            return state;
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

