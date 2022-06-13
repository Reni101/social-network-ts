import React from 'react';
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";


type DialogsPropsType = {
    store: any
}


const DialogsContainer = (props: DialogsPropsType) => {
    const state = props.store.getState().dialogsPage;

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(UpdateNewMessageBodyCreator(body))
    }

    return <Dialogs
        state={state}
        UpdateNewMessageBody={onNewMessageChange}
        sendMessage={onSendMessageClick}

    />

        ;
};

export default DialogsContainer;