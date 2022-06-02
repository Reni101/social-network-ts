import React, {KeyboardEvent, ChangeEvent} from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {ActionsTypes, PostsType} from "../../../Redux/State";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    newPostText: string
    /*addPost: () => void
    updateNewPostText: (newText: string) => void*/
    dispatch:(action:ActionsTypes)=>void
}

const MyPosts = (props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })
        let newPostElement = React.createRef<HTMLTextAreaElement>();

        const addPost = () => {
            if (newPostElement.current) {
                props.dispatch({type: "ADD-POST"})


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
                props.dispatch({type: "UPDATE-NEW-POST-TEXT",newText:text})

            }
        }

        return (
            <div className={styleMP.item}>
                My posts
                <div>
                    <div>
                        <textarea ref={newPostElement}
                                  onKeyDown={pressEnterHandler}
                                  onChange={onPostChange}
                                  value={props.newPostText}/>
                    </div>
                    <div>
                        <button onClick={addPost}> Add post</button>
                    </div>

                </div>

                <div>
                    {mapPost}
                </div>


            </div>
        );
    }
;

export default MyPosts;