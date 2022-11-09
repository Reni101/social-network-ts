import {Contact} from "../Contact/Contact";
import React from "react";

export const ProfileData = (props: any) => {
    return (
        <>
            {props.isOwner && <div>
                <button onClick={props.toEditMode}>edit</button>
            </div>}
            <div><b>Full name</b> {props.profile.fullName}</div>
            <div><b>Looking for a job :</b> {props.profile.lookingForAJob ? "yes" : "no"}</div>
            <div><b>Contacts:</b>
                {Object.keys(props.profile.contacts).map(el => {
                    //@ts-ignore
                    return <Contact ContactTitle={el} ContactValue={props.profile.contacts[el]} key={el}/>
                })}
            </div>
        </>
    );
};