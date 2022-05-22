import React from 'react';
import styleDi from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogs";
import Message from "./MessageItem/Dialogs";
import {DialogsPageType} from "../../Redux/State";


type DialogsPropsType= {
    state:DialogsPageType
}


const Dialogs = (props:DialogsPropsType) => {



    const mapDialogsItem = props.state.dialogsData.map((e) => {
        return <DialogItem name={e.name} id={e.id}/>
    })
    const mapMessage = props.state.messagesData.map((e) => {
        return <Message message={e.message} id={e.id}/>
    })

    return (
        <div className={styleDi.dialogs}>

            <div className={styleDi.dialogs_items}>
                {mapDialogsItem}
            </div>

            <div className={styleDi.messages}>
                {mapMessage}
            </div>
        </div>
    )
        ;
};

export default Dialogs;