import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxlength30, requiredField} from "../../../utils/validator/validators";


export type AddPostType = {
    AddPost: string
}

const AddPostForm: React.FC<InjectedFormProps<AddPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[requiredField,maxlength30 ]}
                       component='textarea'
                       name='AddPost'
                       placeholder="Create post"/>

            </div>
            <div>
                <button> Add post</button>
            </div>

        </form>
    );
};

const AddNewPostReduxForm = reduxForm<AddPostType>({form: 'dialogAddMessageForm'})(AddPostForm)


export default AddNewPostReduxForm;