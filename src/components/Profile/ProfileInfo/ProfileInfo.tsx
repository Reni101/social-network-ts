import React from 'react';
import styleP from "../Profile.module.css";
import Preloader from "../../common/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

type PropsType = {
    profile: ProfileType
    status:string
    updateStatus: (status: string) => void
}


const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    } else
        return (
            <div>
                <div>{props.profile.fullName}</div>
                <img src={props.profile.photos.large} alt="Avatar"/>
               {/* <div className={styleP.item}>{props.profile.aboutMe}</div>*/}
                <ProfileStatus status = {props.status}
                               updateStatus={props.updateStatus}

                />
            </div>
        );
};

export default ProfileInfo;