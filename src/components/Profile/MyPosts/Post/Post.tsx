import React from 'react';
import stylePo from "./Post.module.css"
import avatar from "../../../../assets/avatar.png";

type PostPropsType = {
    text: string
    likeCount: number
}

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={stylePo.item}>
            <img className={stylePo.avatar} src={avatar} alt="avatar"/>

            <div className={stylePo.content}>
                <div>{props.text}</div>
                <div><span> Like: {props.likeCount} </span></div>
            </div>
        </div>
    );
};

export default Post;