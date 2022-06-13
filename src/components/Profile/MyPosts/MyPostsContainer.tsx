import React from 'react';
import {ActionsTypes, PostsType} from "../../../Redux/Store";
import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

const MyPostsContainer = (props: MyPostsPropsType) => {

    const addPost = () => {
        props.dispatch(addPostCreator())
    }
    const onPostChange = (text: string) => {
        let action = UpdateNewPostCreator(text)
        props.dispatch(action)

    }


    return (<MyPosts postsData={props.postsData}
                     newPostText={props.newPostText}
                     addPost={addPost}
                     updateNewPostText={onPostChange}/>)

};

export default MyPostsContainer;