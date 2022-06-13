import React from 'react';
import contentIMG from "../../img/content .jpg";
import styleP from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {RootStateType} from "../../Redux/Store";

type ProfilePropsType = {
    store:any
}


const Profile = (props: ProfilePropsType) => {


    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG}/>

            <ProfileInfo/>
            <MyPostsContainer
                     store={props.store}
            />

        </div>
    );
};

export default Profile;