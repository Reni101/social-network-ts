import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormsControl";
import {maxlengthCreator, requiredField} from "../../utils/validator/validators";


export type FormDataLoginType = {
    login:string
    password:string
    rememberMe:boolean

}
const maxLength20 = maxlengthCreator(20)

const LoginForm:React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"}
                       validate={[requiredField,maxLength20]}
                       component={Input}
                       name={"login"}/>
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    type = {"password"}
                    validate={[requiredField,maxLength20]}
                    component={Input}
                    name={"password"}/>
            </div>
            <div>
                <Field
                    type={"checkbox"}
                    component={Input}
                    name={"rememberMe"}
                />remember me
            </div>
            <div>
                <button> login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataLoginType>({form: 'login'})(LoginForm)

export default LoginReduxForm;