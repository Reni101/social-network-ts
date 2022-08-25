import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type AddPostType = {
    AddPost: string
}

const AddPostForm: React.FC<InjectedFormProps<AddPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='AddPost' placeholder="Create post"/>

            </div>
            <div>
                <button> Add post</button>
            </div>

        </form>
    );
};

const AddPostReduxForm = reduxForm<AddPostType>({form: 'dialogAddMessageForm'})(AddPostForm)


export default AddPostReduxForm;