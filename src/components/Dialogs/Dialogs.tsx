import React, {ChangeEvent} from 'react';
import styleDi from './Dialogs.module.css'
import Message from "./MessageItem/Dialogs";
import {DialogsPageType} from "../../Redux/Types";

import DialogItem from "./Dialogitem/DialogsItem";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    UpdateNewMessageBody: (body: string) => void
    sendMessage: () => void
    isAuth:boolean
}


const Dialogs = (props: DialogsPropsType) => {

    const mapDialogsItem = props.dialogsPage.dialogsData.map(e => {
        return <DialogItem name={e.name} id={e.id} key={e.id}/>
    })
    const mapMessageElement = props.dialogsPage.messagesData.map(e => {
        return <Message message={e.message} id={e.id} key={e.id}/>
    })

    const onSendMessageClick = () => {
        props.sendMessage()
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.UpdateNewMessageBody(body);
    }

    return (
        <div className={styleDi.dialogs}>

            <div className={styleDi.dialogs_items}>
                {mapDialogsItem}
            </div>

            <div className={styleDi.messages}>
                <div> {mapMessageElement} </div>
                <div><textarea placeholder="Enter your message"
                               onChange={onNewMessageChange}
                               value={props.dialogsPage.newMessagesBody}
                ></textarea>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>SEND</button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Dialogs;