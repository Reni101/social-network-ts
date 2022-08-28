import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormsControl";
import {maxlengthCreator, requiredField} from "../../utils/validator/validators";


export type FormDataLoginType = {
    login:string
    password:string
    rememberMe:boolean

}
const maxLength10 = maxlengthCreator(10)

const LoginForm:React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"}
                       validate={[requiredField,maxLength10]}
                       component={Input}
                       name={"login"}/>
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    validate={[requiredField,maxLength10]}
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