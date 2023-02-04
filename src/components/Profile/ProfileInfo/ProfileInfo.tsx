import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType, savePhotoTC} from "../../../Redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import UserAvatar from '../../../assets/UsersAvatar.jpg'

import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/Redux-store";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
}


const ProfileInfo = React.memo((props: PropsType) => {
    const statusFromState = useSelector<AppRootStateType, string>(state => state.profilePage.status)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files!.length) {
             dispatch(savePhotoTC((e.target.files![0])))
        }
    }

    return (
        <div>
            <img src={props.profile.photos.large || UserAvatar} alt="Avatar" className={style.Avatar}/>
            <div> {props.isOwner && <input type="file" onChange={mainPhotoSelected}/>} </div>
            {props.isOwner ? <ProfileStatus/>
                : <div>{statusFromState || "Status not found"} </div>}



            {editMode ? <ProfileDataForm profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
                    setEditMode(false)
                }}/> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
                    setEditMode(true)
                }}/>}

        </div>
    );
})

export default ProfileInfo;


