import React from 'react';
import {useFormik} from "formik";

type PropsType = {
    addPost: (text: string) => void
}

const AddPostForm = (props:PropsType) => {
    const formik = useFormik({
        initialValues: {
            SendPost: '',
        },
        onSubmit: values => {
          props.addPost(values.SendPost)
            formik.resetForm()
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                name="SendPost"
                type="text"
                placeholder="add new Post"
                onChange={formik.handleChange}
                value={formik.values.SendPost}
            />
                <button type="submit">Add post</button>

        </form>
    );
};


export default AddPostForm;