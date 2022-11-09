import React, {memo} from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/Types";
import AddPostForm from "./AddPostForm";



type MyPostsPropsType = {
    postsData: Array<PostsType>
    addPost: (text: string) => void
}


const MyPosts = memo((props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })



        return (
            <div className={styleMP.item}>
                Add post
                <div>
                    <AddPostForm addPost={props.addPost} />

                </div>

                <div>
                    My posts
                    {mapPost}
                </div>


            </div>
        );
    })
;

export default MyPosts;