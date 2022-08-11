import React from 'react';
import {Field, reduxForm} from "redux-form";


const LoginForm = () => {
    return (
        <form>
            <div><Field placeholder={"Login"} component={"input"}/></div>
            <div><Field placeholder={"Password"} component={"input"}/></div>
            <div><input type={"checkbox"}/>remember me</div>
            <div>
                <button> login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default LoginReduxForm;