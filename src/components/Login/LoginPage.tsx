import React from 'react';
import LoginReduxForm, {FormDataLoginType} from "./LoginForm";
import {loginTC} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";

const LoginPage = (props: any) => {
    const onSubmit = (formData: FormDataLoginType) => {
        props.Login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
const mapStateToProps = (state: AppRootStateType)    => ({isAuth: state.auth.isAuth})

export default connect(mapStateToProps, {Login: loginTC})(LoginPage);