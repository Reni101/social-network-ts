import React, {KeyboardEvent, ChangeEvent} from 'react';
import styleMP from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/Store";


type MyPostsPropsType = {
    postsData: Array<PostsType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () =>void
}


const MyPosts = (props: MyPostsPropsType) => {
        const mapPost = props.postsData.map((e) => {
            return <Post key={e.id} text={e.message} likeCount={e.likeCount}/>
        })
        let newPostElement = React.createRef<HTMLTextAreaElement>();

        const addPostHandler = () => {
            if (newPostElement.current) {
                props.addPost()
            }
        }
        const pressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
                addPostHandler()
            }
        }
        const onPostChangeHandler = () => {
            if (newPostElement.current) {
                let text = newPostElement.current.value;
                props.updateNewPostText(text)
            }
        }
        return (
            <div className={styleMP.item}>
                My posts
                <div>
                    <div>
                        <textarea ref={newPostElement}
                                  onKeyDown={pressEnterHandler}
                                  onChange={onPostChangeHandler}
                                  value={props.newPostText}
                                  placeholder="Create post"
                        />

                    </div>
                    <div>
                        <button onClick={addPostHandler}> Add post</button>
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