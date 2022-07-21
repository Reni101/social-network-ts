import React from 'react';
import {addPostAC, updateNewPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ActionsTypes, PostsType, RootStateType} from "../../../Redux/Types";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../Redux/Redux-store";

type mapStateToPropsType = {
    postsData: Array<PostsType>
    newPostText: string
}

type mapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}


let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostAC(text)
            dispatch(action)
        }
    }
}


const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}
    , AppRootStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;