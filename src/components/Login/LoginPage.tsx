import React from 'react';
import {loginTC} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";
import LoginForm from "./LoginForm";


type mapStateToPropsType = {
    isAuth: boolean
}

type mapDispatchToPropsType = {
    Login: (login: string, password: string, rememberMe: boolean) => void
}

const LoginPage: React.FC<mapStateToPropsType & mapDispatchToPropsType> = ({Login, isAuth}) => {
debugger
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
          <LoginForm Login={Login}/>
        </div>
    );
};
const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => ({isAuth: state.auth.isAuth})

export default connect(mapStateToProps, {Login: loginTC})(LoginPage);