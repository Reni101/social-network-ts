import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import UserAvatar from '../../../img/UsersAvatar.jpg'

import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
}


const ProfileInfo = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files!.length) {
            props.savePhoto(e.target.files![0])
        }
    }

    return (
        <div>
            <img src={props.profile.photos.large || UserAvatar} alt="Avatar" className={style.Avatar}/>
            <div> {props.isOwner && <input type="file" onChange={mainPhotoSelected}/>} </div>
            {props.isOwner ? <ProfileStatus status={props.status}
                                            updateStatus={props.updateStatus}
                />
                : <div>{props.status || "Status not found"} </div>}
            {editMode ? <ProfileDataForm profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
                    setEditMode(false)
                }} /> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
                    setEditMode(true)
                }}/>}

        </div>
    );
};

export default ProfileInfo;


