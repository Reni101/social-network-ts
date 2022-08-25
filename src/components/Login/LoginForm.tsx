import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type FormDataLoginType = {
    login:string
    password:string
    rememberMe:boolean

}

const LoginForm:React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"}
                       component={"input"}
                       name={"login"}/>
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    component={"input"}
                    name={"password"}/>
            </div>
            <div>
                <Field
                    type={"checkbox"}
                    component={"input"}
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