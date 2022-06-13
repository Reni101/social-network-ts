import React, {KeyboardEvent, ChangeEvent} from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {ActionsTypes, PostsType} from "../../../Redux/Store";
import {addPostCreator, UpdateNewPostCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

const MyPostsContainer = (props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })
        let newPostElement = React.createRef<HTMLTextAreaElement>();

        const addPost = () => {
            if (newPostElement.current) {
                props.dispatch(addPostCreator())

            }
        }
        const pressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
                addPost()
            }
        }
        const onPostChange = () => {
            if (newPostElement.current) {
                let text = newPostElement.current.value;
                let action = UpdateNewPostCreator(text)
                props.dispatch(action)

            }
        }

        return <MyPosts postsData={} newPostText={} dispatch={}
                        updateNewPostText={()=>{}} />
    }
;

export default MyPostsContainer;