import React from 'react';
import style from './ProfileInfo.module.css'
import styleP from "../Profile.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div className={styleP.item}>Avatar + description</div>
        </div>
    );
};

export default ProfileInfo;