import React from 'react';
import contentIMG from "../../assets/content .jpg";
import styleP from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useAppSelector} from "../../Redux/Redux-store";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileType} from "../../Redux/Types";

type ProfilePropsType = {
    isOwner: boolean

}


const Profile = React.memo((props: ProfilePropsType) => {
    const profile = useAppSelector<ProfileType>(state => state.profilePage.profile!)

    return (
        <div className={styleP.profile}>
            <div className={styleP.main}>Main content</div>

            <img className={styleP.contentIMG} src={contentIMG} alt="img"/>

            <ProfileInfo isOwner={props.isOwner}
                         profile={profile}

            />
            {props.isOwner && <MyPosts/>}

        </div>
    );
})

export default Profile;