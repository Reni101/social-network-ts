import React, {ChangeEvent} from 'react';
import styleDi from './Dialogs.module.css'
import Message from "./MessageItem/Dialogs";
import {DialogsPageType, StoreType,} from "../../Redux/Store";
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import DialogItem from "./Dialogitem/DialogsItem";


type DialogsPropsType = {
    state:DialogsPageType
    UpdateNewMessageBody: (body: string) => void
    sendMessage: () => void
}


const Dialogs = (props: DialogsPropsType) => {


    const mapDialogsItem = props.state.dialogsData.map(e => {
        return <DialogItem name={e.name} id={e.id} key={e.id}/>
    })
    const mapMessageElement = props.state.messagesData.map(e => {
        return <Message message={e.message} id={e.id} key={e.id}/>
    })

    const onSendMessageClick = () => {
        props.sendMessage()
        // props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.UpdateNewMessageBody(body);
        //  props.store.dispatch(UpdateNewMessageBodyCreator(body))
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
                               value={props.state.newMessagesBody}
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