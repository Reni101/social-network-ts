import React from 'react';
import contentIMG from "../../img/content .jpg";
import styleP from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../Redux/State";

type ProfilePropsType = {
    state:ProfilePageType
/*    addPost:()=>void
    updateNewPostText:(newText:string)=>void*/
    dispatch:(action:ActionsTypes)=>void
}


const Profile = (props:ProfilePropsType) => {


    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG}/>

            <ProfileInfo/>
            <MyPosts postsData={props.state.postsData}
                     dispatch={props.dispatch}
                     /*addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}*/
                     newPostText={props.state.newPostText}/>

        </div>
    );
};

export default Profile;