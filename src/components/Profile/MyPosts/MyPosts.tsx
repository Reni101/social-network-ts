import React, {KeyboardEvent} from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/Types";
import AddPostReduxForm, {AddPostType} from "./AddPostForm";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    addPost: (text:string) => void
}


const MyPosts = (props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })

        const addPost = (value:AddPostType) => {
            props.addPost(value.AddPost)
        }
/*        const pressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
                addPostHandler()
            }
        }*/

        return (
            <div className={styleMP.item}>
                My posts
                <div>
                    <AddPostReduxForm onSubmit={addPost}/>

                </div>

                <div>
                    {mapPost}
                </div>


            </div>
        );
    }
;

export default MyPosts;