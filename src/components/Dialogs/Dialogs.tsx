import React, {ChangeEvent} from 'react';
import styleDi from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogs";
import Message from "./MessageItem/Dialogs";
import {
    ActionsTypes,
    DialogsPageType,
    StoreType,
} from "../../Redux/State";
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";


type DialogsPropsType = {
    state: DialogsPageType
    store: StoreType
}


const Dialogs = (props: DialogsPropsType) => {


    const mapDialogsItem = props.state.dialogsData.map((e) => {
        return <DialogItem name={e.name} id={e.id} key={e.id}/>
    })
    const mapMessageElement = props.state.messagesData.map((e) => {
        return <Message message={e.message} id={e.id} key={e.id}/>
    })

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.store.dispatch(UpdateNewMessageBodyCreator(body))
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