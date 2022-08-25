import React from 'react';
import {addPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ActionsTypes, PostsType} from "../../../Redux/Types";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../Redux/Redux-store";

type mapStateToPropsType = {
    postsData: Array<PostsType>
}

type mapDispatchToPropsType = {
    addPost: (text:string) => void
}


let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {
    return {
        addPost: (text: string) => {
            dispatch(addPostAC(text))
        },

    }
}


const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}
    , AppRootStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;