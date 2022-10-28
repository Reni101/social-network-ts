import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import UserAvatar from '../../../img/UsersAvatar.jpg'
import {Contact} from "./Contact/Contact";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
}


const ProfileInfo = (props: PropsType) => {

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
            {/*<div className={style.fullName}>{props.profile.fullName}</div>*/}
            <img src={props.profile.photos.large || UserAvatar} alt="Avatar" className={style.Avatar}/>
            <div> {props.isOwner && <input type="file" onChange={mainPhotoSelected}/>} </div>
            <ProfileStatus status={props.status}
                           updateStatus={props.updateStatus}
            />
            <div><b>Full name</b> {props.profile.fullName}</div>
            <div><b>Looking for a job :</b> {props.profile.lookingForAJob ? "yes" : "no"}</div>
            <div><b>Contacts:</b>
                {Object.keys(props.profile.contacts).map(el => {
                    //@ts-ignore
                  return  <Contact ContactTitle={el} ContactValue={props.profile.contacts[el]} key={el}/>
                })}

            </div>
        </div>
    );
};

export default ProfileInfo;