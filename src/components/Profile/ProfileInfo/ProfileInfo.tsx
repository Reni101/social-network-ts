import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import UserAvatar from '../../../img/UsersAvatar.jpg'

type PropsType = {
    profile: ProfileType
    status:string
    updateStatus: (status: string) => void
    isOwner:boolean
    savePhoto:any
}


const ProfileInfo = (props: PropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }
        
        const mainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
             if(e.target.files!.length){
                props.savePhoto(e.target.files![0])
             }
        }
        
        return (
            <div>
                <div className={style.fullName}>{props.profile.fullName}</div>
                <img src={props.profile.photos.large || UserAvatar } alt="Avatar" className={style.Avatar}/>

                <ProfileStatus status = {props.status}
                               updateStatus={props.updateStatus}
                />
                <div> {props.isOwner && <input type="file" onChange={mainPhotoSelected}/>}</div>
            </div>
        );
};

export default ProfileInfo;