import React from 'react';
import style from './SearchForm.module.css'
import {useFormik} from "formik";

import {FilterType,} from "../../../Redux/users-reducer";


type FormikErrorType = {
    term?: string
    onlyFriend: boolean

}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const SearchForm = (props: PropsType) => {

    const formik = useFormik({
        initialValues: {
            term: '',
            onlyFriend: false


        },
        onSubmit: values => {

            alert(values.onlyFriend)
            //  props.onFilterChanged({term: values.term, friend: all})
        },

        validate: (values: FormikErrorType) => {

        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={style.containerForm}>
            <div>term</div>
            <input
                name="term"
                type="text"
                onChange={formik.handleChange}

            />

            {/*<select name="friend" value={"myFriend"} onChange={formik.}>*/}
            {/*    <option value="all" label="all">All</option>*/}
            {/*    <option value="myFriend" label='myFriend'>my Friend</option>*/}
            {/*</select>*/}


            <input name='onlyFriend' type="checkbox" checked={formik.values.onlyFriend}/>
            <div>
                <button type="submit">Find</button>
            </div>
        </form>
    );
};

