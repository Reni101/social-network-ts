import React from 'react';
import contentIMG from "../../img/content .jpg";
import styleP from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
profile:any
}


const Profile = (props: ProfilePropsType) => {


    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG}/>

            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>

        </div>
    );
};

export default Profile;