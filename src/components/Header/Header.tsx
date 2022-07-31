import React from 'react';
import logo from "../../img/img_logo.png";
import styleH from "./Header.module.css"
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string


}

const Header = (props: PropsType) => {

    return (
        <div className={styleH.header}>
            <div><img className={styleH.logo} src={logo} alt="logo"/>

            </div>
            <div className={styleH.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to='/login'>Login </NavLink>}
            </div>


        </div>
    );
};

export default Header;