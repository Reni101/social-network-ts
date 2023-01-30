import React from 'react';
import style from './SearchForm.module.css'
import {useFormik} from "formik";

import {FilterType,} from "../../../Redux/users-reducer";


type FormikErrorType = {
    term?: string
    onlyFriend: string

}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const SearchForm = (props: PropsType) => {

    const formik = useFormik({
        initialValues: {
            term: '',
            onlyFriend: "all"


        },
        onSubmit: values => {
            let filterFriend = null
            if (values.onlyFriend === "all") filterFriend = null
            if (values.onlyFriend === "myFriend") filterFriend = true
            props.onFilterChanged({term: values.term, friend: filterFriend})
        },

        validate: (values: FormikErrorType) => {

        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={style.containerForm}>
            <input
                name="term"
                type="text"
                onChange={formik.handleChange}

            />

            <select name="onlyFriend" value={formik.values.onlyFriend} onChange={formik.handleChange}>
                <option value="all">All</option>
                <option value="myFriend">my friend</option>
            </select>
            <div>
                <button type="submit">Find</button>
            </div>
        </form>
    );
};

