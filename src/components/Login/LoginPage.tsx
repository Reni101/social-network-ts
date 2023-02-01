import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";
import LoginForm from "./LoginForm";


export const LoginPage = () => {
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm/>
        </div>
    );
};
