import React from 'react';
import logo from "../../img/img_logo.png";
import styleH from "./Header.module.css"

const Header = () => {
    return (
        <div className={styleH.header}>
            <div><img className={styleH.logo} src={logo} alt="logo"/></div>
        </div>
    );
};

export default Header;