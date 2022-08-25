import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type FormDataAddMessageType = {
    newMessageBody: string
}


const AddMessageForm: React.FC<InjectedFormProps<FormDataAddMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder="Enter your message"/>
            </div>
            <div>
                <button>SEND</button>

            </div>
        </form>
    );
};

const AddMessageReduxForm = reduxForm<FormDataAddMessageType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default AddMessageReduxForm;