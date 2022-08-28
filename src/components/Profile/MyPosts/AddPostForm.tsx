import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxlengthCreator, requiredField} from "../../../utils/validator/validators";
import TextArea from "../../common/FormControls/FormsControl";

const maxLength10 = maxlengthCreator(10)

export type AddPostType = {
    newPostText: string
}

const AddPostForm: React.FC<InjectedFormProps<AddPostType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[requiredField, maxLength10]}
                       component={TextArea}
                       name='newPostText'
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