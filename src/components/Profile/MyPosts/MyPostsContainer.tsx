import React from 'react';
import {ActionsTypes, PostsType} from "../../../Redux/Store";
import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";


type MyPostsPropsType = {
    store:any
}

const MyPostsContainer = (props: MyPostsPropsType) => {

    let state= props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostCreator()) //
    }
    const onPostChange = (text: string) => {
        let action = UpdateNewPostCreator(text)
        props.store.dispatch(action)

    }


    return (<MyPosts postsData={state.profilePage.postsData}
                     newPostText={state.profilePage.newPostText}
                     addPost={addPost}
                     updateNewPostText={onPostChange}/>)

};

export default MyPostsContainer;