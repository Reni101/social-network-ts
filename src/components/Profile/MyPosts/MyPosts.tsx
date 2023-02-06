import React from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {AddPostForm} from "./AddPostForm";
import {useAppSelector} from "../../../Redux/Redux-store";


export const MyPosts = ( ) => {
    const postsData= useAppSelector(state => state.profilePage.postsData)
        const mapPost = postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })
        return (
            <div className={styleMP.item}>
                Add post
                <div>
                    <AddPostForm />

                </div>

                <div>
                    My posts
                    {mapPost}
                </div>


            </div>
        );
    }
;

