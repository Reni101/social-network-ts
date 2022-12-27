import React from "react";
import {Contact} from "../Contact/Contact";
import {useFormik} from "formik";

export const ProfileDataForm = (props: any) => {

    const formik = useFormik({
        initialValues: {
            fullName: '',
        },
        onSubmit: values => {
            //   formik.resetForm()
        },
        validate: (values) => {
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {props.isOwner && <div>
                <button onClick={props.toEditMode}>edit</button>
            </div>}
            <div><b>Full name</b>
                <input type="fullName" onChange={formik.handleChange}
                       value={props.profile.fullName}/>
            </div>


            <div><b>Looking for a job :</b> {props.profile.lookingForAJob ? "yes" : "no"}</div>
            <div><b>Contacts:</b>
                {Object.keys(props.profile.contacts).map(el => {
                    return <Contact ContactTitle={el} ContactValue={props.profile.contacts[el]} key={el}/>
                })}
            </div>
        </form>
    );
};