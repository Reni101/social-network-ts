import React from 'react';
import {useFormik} from "formik";

type PropsType = {
    sendMessage: (messageBody: string) => void
}

const AddMessageForm = (props: PropsType) => {
    const formik = useFormik({
        initialValues: {
            Text: '',
        },
        onSubmit: values => {
            props.sendMessage(values.Text)
            formik.resetForm()
        },
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    name="Text"
                    type="textarea"
                    onChange={formik.handleChange}
                    value={formik.values.Text}
                />
            </div>
            <div>
                <button type="submit">Send message</button>

            </div>
        </form>
    );
};

export default AddMessageForm;