import React from 'react';
import styleDi from '.././Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    id: number
}


const DialogItem = (props: DialogItemPropsType) => {
    return (<div className={styleDi.item}>
        <NavLink to={"/dialogs/" + props.id} activeClassName={styleDi.active}>{props.name}</NavLink>
    </div>)
}


export default DialogItem;