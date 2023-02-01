import React from 'react';
import styleH from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {logoutTC} from "../../Redux/auth-reducer";
import {Layout, theme} from "antd";

const {Header} = Layout;


export const HeaderPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const login = useSelector<AppRootStateType>(state => state.auth.login)
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (

        <div className={styleH.header}>

            <Header style={{padding: 0, background: colorBgContainer}}>

                <div className={styleH.loginBlock}>
                    {isAuth ? <div>{login} - <button onClick={logoutHandler}>Log out</button></div>
                        : <NavLink to='/login'>Login </NavLink>}
                </div>

            </Header>


        </div>
    );
};

