import React from 'react';
import styleN from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import Sidebar from "./Sidebar";


const Navbar: React.FC = () => {
    return (
        <nav className={styleN.nav}>
            <div className={styleN.item}>
                <NavLink to="/profile/24522" activeClassName={styleN.active}>Profile</NavLink>
            </div>

            <div className={styleN.item}>
                <NavLink to="/dialogs" activeClassName={styleN.active}>Message</NavLink>
            </div>

            <div className={styleN.item}>
                <NavLink to="/news" activeClassName={styleN.active}>News</NavLink>
            </div>

            <div className={styleN.item}>
                <NavLink to="/music" activeClassName={styleN.active}>Music</NavLink>
            </div>

            <div className={styleN.item}>
                <NavLink to="/setting" activeClassName={styleN.active}>Setting</NavLink>
            </div>
            <div className={styleN.item}>
                <NavLink to="/users" activeClassName={styleN.active}>Users</NavLink>
            </div>
            <Sidebar/>
        </nav>
    );
};

export default Navbar;