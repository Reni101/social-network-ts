import React from 'react';
import logo from "../../img/img_logo.png";
import styleH from "./Header.module.css"
import {NavLink} from "react-router-dom";

type PropsType= {
    isAuth:boolean
    login:string
    setAuthUserData:any
}

const Header = (props: any) => {

    return (
        <div className={styleH.header}>
            <div><img className={styleH.logo} src={logo} alt="logo"/>
                <div className={styleH.loginBlock}>
                    {props.isAuth ? props.login
                        : <NavLink to='login'>Login </NavLink> }


                </div>
            </div>


        </div>
    );
};

export default Header;