import React from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/Types";
import AddNewPostReduxForm, {AddPostType} from "./AddPostForm";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    addPost: (text: string) => void
}


const MyPosts = (props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })

        const addPost = (value: AddPostType) => {
            debugger
            props.addPost(value.newPostText)
        }

        return (
            <div className={styleMP.item}>
                Add post
                <div>
                    <AddNewPostReduxForm onSubmit={addPost}/>

                </div>

                <div>
                    My posts
                    {mapPost}
                </div>


            </div>
        );
    }
;

export default MyPosts;