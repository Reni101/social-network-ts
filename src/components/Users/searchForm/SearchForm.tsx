import React from 'react';
import style from './SearchForm.module.css'
import {useFormik} from "formik";

import {FilterType,} from "../../../Redux/users-reducer";
import {Button, Select, Space} from "antd";
import {json} from "stream/consumers";
import Input from "antd/lib/input/Input";


type FormikErrorType = {
    term?: string
    onlyFriend: string

}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const SearchForm = (props: PropsType) => {
    const handleChange = (value: string) => {
        formik.values.onlyFriend = value
    };

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

            <Input placeholder="Basic usage" onChange={formik.handleChange} name="term"/>

            <Select

                defaultValue="all"
                style={{width: 120}}
                onChange={handleChange}
                options={[
                    {value: 'all', label: 'All'},
                    {value: 'myFriend', label: 'my friend'},
                ]}
            />
            <div>

                <Button htmlType="submit" type="primary" onClick={formik.handleChange}>Search</Button>
            </div>
        </form>
    );
};

