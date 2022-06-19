import React from 'react';
import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostsType, RootStateType} from "../../../Redux/Store";
import {UserType} from "../../../Redux/users-reducer";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    postsData: Array<PostsType>
    newPostText: string
}

type mapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}


let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostCreator())
        },
        updateNewPostText: (text: string) => {
            let action = UpdateNewPostCreator(text)
            dispatch(action)
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;