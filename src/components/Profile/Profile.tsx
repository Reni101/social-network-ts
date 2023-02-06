import React from 'react';
import styleP from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useAppSelector} from "../../Redux/Redux-store";
import {ProfileType} from "../../Redux/Types";

type ProfilePropsType = {
    isOwner: boolean

}


const Profile = React.memo((props: ProfilePropsType) => {
    const profile = useAppSelector<ProfileType>(state => state.profilePage.profile!)

    return (
        <div className={styleP.profileContainer}>
            <ProfileInfo isOwner={props.isOwner}
                         profile={profile}

            />
            {/*{props.isOwner && <MyPosts/>}*/}

        </div>
    );
})

export default Profile;