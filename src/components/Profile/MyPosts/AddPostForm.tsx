import React from 'react';
import {useFormik} from "formik";

type PropsType = {
    addPost: (text: string) => void
}

const AddPostForm = (props: PropsType) => {
    const formik = useFormik({
        initialValues: {
            sendPost: '',
        },
        onSubmit: values => {
            props.addPost(values.sendPost)
            formik.resetForm()
        },
        validate: (values) => {
            const errors:{sendPost?:string} = {}

            if (!values.sendPost) {
                errors.sendPost = "Required"
            }
            return errors
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea style={{width: "150px", height: "30px"}}
                      name="sendPost"
                      placeholder="add new Post Formik"
                      onChange={formik.handleChange}
                      value={formik.values.sendPost}
            >

            </textarea>
            {formik.touched.sendPost && formik.errors.sendPost &&
                <div style={{color: "red"}}>{formik.errors.sendPost}</div>}
            <div>
                <button type="submit">Add post</button>
            </div>


        </form>
    );
};


export default AddPostForm;