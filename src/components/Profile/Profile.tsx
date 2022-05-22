import React from 'react';
import contentIMG from "../../img/content .jpg";
import styleP from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../Redux/State";

type ProfilePropsType = {
    state:ProfilePageType
    addPost:()=>void
    updateNewPostText:(newText:string)=>void
}


const Profile = (props:ProfilePropsType) => {


    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG}/>

            <ProfileInfo/>
            <MyPosts postsData={props.state.postsData}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     newPostText={props.state.newPostText}/>

        </div>
    );
};

export default Profile;