import React from 'react';
import styleN from "./Navbar.module.css"
import {NavLink} from "react-router-dom";


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
                <NavLink to="/users" activeClassName={styleN.active}>Users</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;