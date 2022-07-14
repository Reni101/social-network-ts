import React from 'react';
import styleP from "../Profile.module.css";
import Preloader from "../../Preloader";

const ProfileInfo = (props:any) => {
    if(!props.profile){
        return <Preloader/>
    } else
    return (
        <div>
            <div className={styleP.item}>Avatar + description</div>
            <img src={props.profile.photos.large} />
        </div>
    );
};

export default ProfileInfo;