import React,  from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";
import LoginForm from "./LoginForm";


export const LoginPage = () => {
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    if (isAuth) {
        return <Navigate to={`/chat`}/>
    }
    return (
        <div>
            <LoginForm/>

        </div>
    );
};
