import React from 'react';


import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import StoreContext from '../../../StoreContext';
import MyPosts from "./MyPosts";


const MyPostsContainer = () => {
    // let state= props.store.getState()
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const addPost = () => {
                        store.dispatch(addPostCreator()) //
                    }
                    const onPostChange = (text: string) => {
                        let action = UpdateNewPostCreator(text)
                        store.dispatch(action)
                    }

                    return <MyPosts
                        postsData={store.getState().profilePage.postsData}
                        newPostText={store.getState().profilePage.newPostText}
                        addPost={addPost}
                        updateNewPostText={onPostChange}/>
                }


            }
        </StoreContext.Consumer>
    )


};

export default MyPostsContainer;