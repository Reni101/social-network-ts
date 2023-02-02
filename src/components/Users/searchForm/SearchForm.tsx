import React from 'react';
import style from './SearchForm.module.css'
import {useFormik} from "formik";
import {Button, Select} from "antd";
import Input from "antd/lib/input/Input";

type PropsType = {
    termQuery: string,
    friendQuery: string
    setSearchParams: ({}: { name: string, friend: string } | {}) => void

}

export const SearchForm = (props: PropsType) => {
    const handleChange = (value: string) => {
        formik.values.onlyFriend = value
    };

    const formik = useFormik({
        initialValues: {
            term: props.termQuery,
            onlyFriend: props.friendQuery
        },
        onSubmit: values => {
            props.setSearchParams({name: values.term, friend: values.onlyFriend})
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={style.containerForm}>

            <Input
                defaultValue={formik.values.term}
                placeholder="Basic usage"
                onChange={formik.handleChange}
                name="term"/>

            <Select
                defaultValue={formik.values.onlyFriend || "all"}
                style={{width: 120}}
                onChange={handleChange}
                options={[
                    {value: 'all', label: 'All'},
                    {value: 'myFriend', label: 'my friend'},
                ]}
            />
            <Button htmlType="submit" type="primary">Search</Button>
        </form>
    );
};

