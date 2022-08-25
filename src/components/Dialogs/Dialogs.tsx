import React from 'react';
import styleDi from './Dialogs.module.css'
import Message from "./MessageItem/Dialogs";
import {DialogsPageType} from "../../Redux/Types";

import DialogItem from "./Dialogitem/DialogsItem";
import AddMessageReduxForm, {FormDataAddMessageType} from "./AddMessageForm";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    sendMessage: (messageBody: string) => void
    //isAuth: boolean
}


const Dialogs = (props: DialogsPropsType) => {

    const mapDialogsItem = props.dialogsPage.dialogsData.map(e => {
        return <DialogItem name={e.name} id={e.id} key={e.id}/>
    })
    const mapMessageElement = props.dialogsPage.messagesData.map(e => {
        return <Message message={e.message} id={e.id} key={e.id}/>
    })

    const addNewMessage = (values: FormDataAddMessageType) => {
        props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={styleDi.dialogs}>

            <div className={styleDi.dialogs_items}>
                {mapDialogsItem}
            </div>

            <div className={styleDi.messages}>
                <div> {mapMessageElement} </div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
        ;
};

export default Dialogs;