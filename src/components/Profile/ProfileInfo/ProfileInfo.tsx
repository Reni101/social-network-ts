import React from 'react';
import styleP from "../Profile.module.css";
import Preloader from "../../Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";

type PropsType = {
    profile:ProfileType
}

const ProfileInfo = (props:PropsType) => {
    if(!props.profile){
        return <Preloader/>
    } else
    return (
        <div>
            <div className={styleP.item}>Avatar + description</div>
            <img src={props.profile.photos.large} alt="Avatar" />
        </div>
    );
};

export default ProfileInfo;