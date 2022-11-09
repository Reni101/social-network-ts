import React from 'react';
import {useFormik} from "formik";

type PropsType = {
    sendMessage: (messageBody: string) => void
}

type FormikType = {
    Text?: string
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
        validate: (values: FormikType) => {
            const errors: FormikType = {}

            if (!values.Text) {
                errors.Text = "Required"
            }
            return errors
        },
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    placeholder="Send messages Formik"
                    name="Text"
                    onChange={formik.handleChange}
                    value={formik.values.Text}
                ></textarea>

                {formik.touched.Text && formik.errors.Text &&
                    <div style={{color: "red"}}>{formik.errors.Text}</div>}
            </div>
            <div>
                <button type="submit">Send message</button>
            </div>
        </form>
    );
};

export default AddMessageForm;