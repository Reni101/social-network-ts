import React, {useState} from 'react';
import styleN from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import {
    ContainerOutlined,
    DesktopOutlined
    ,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Menu} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Profile', '1', <PieChartOutlined/>),
    getItem('Message', '2', <DesktopOutlined/>),
    getItem('Users', '3', <ContainerOutlined/>),
];


const Navbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };



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

            <div style={{width: 256}}>
                <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={({ item, key, keyPath, domEvent })=>{

                    }}

                />
            </div>


        </nav>
    );
};

export default Navbar;

