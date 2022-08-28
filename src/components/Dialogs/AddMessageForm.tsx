import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import TextArea from "../common/FormControls/FormsControl";
import {maxlengthCreator, requiredField} from "../../utils/validator/validators";


const maxLength30 = maxlengthCreator(30)
export type FormDataAddMessageType = {
    newMessageBody: string
}


const AddMessageForm: React.FC<InjectedFormProps<FormDataAddMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea}
                       validate={[requiredField,maxLength30,]}
                       name='newMessageBody'
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button>SEND</button>

            </div>
        </form>
    );
};

const AddMessageReduxForm = reduxForm<FormDataAddMessageType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default AddMessageReduxForm;