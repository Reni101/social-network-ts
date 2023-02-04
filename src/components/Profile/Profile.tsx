import React from 'react';
import contentIMG from "../../assets/content .jpg";
import styleP from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";

type ProfilePropsType = {
    isOwner: boolean

}


const Profile = React.memo((props: ProfilePropsType) => {
    const profile = useSelector<AppRootStateType,ProfileType>(state => state.profilePage.profile!)


    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG} alt="img"/>

            <ProfileInfo isOwner={props.isOwner}
                         profile={profile}

            />
            {props.isOwner && <MyPostsContainer/>}

        </div>
    );
})

export default Profile;