import React from 'react';
import contentIMG from "../../img/content .jpg";
import styleP from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType
}


const Profile = (props: ProfilePropsType) => {

    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG} alt="img"/>

            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>

        </div>
    );
};

export default Profile;