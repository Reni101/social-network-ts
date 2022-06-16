import React from 'react';
import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";



let mapStateToProps = (state: any) => {
    return {
        postsData:state.profilePage.postsData,
        newPostText:state.profilePage.newPostText
    }
}


let mapDispatchToProps = (dispatch:any) => {
    return {
        addPost: () => {
            dispatch(addPostCreator())
        },
        updateNewPostText: (text:string) => {
            let action = UpdateNewPostCreator(text)
            dispatch(action)
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;