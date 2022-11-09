import React from "react";
import {Contact} from "../Contact/Contact";

export const ProfileDataForm = (props: any) => {
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