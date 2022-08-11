import React from 'react';
import {reduxForm} from "redux-form";



const LoginForm = () => {
    return (
        <form>
            <div><input placeholder={"Login"}/></div>
            <div><input placeholder={"Password"}/></div>
            <div><input type={"checkbox"}/>remember me</div>
            <div>
                <button> login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default LoginReduxForm;