import React from 'react';
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import StoreContext from '../../StoreContext';
import Dialogs from "./Dialogs";




const DialogsContainer = () => {
    return <StoreContext.Consumer>
        {

        (store) => {
            const state = store.getState().dialogsPage;

            const onSendMessageClick = () => {
                store.dispatch(sendMessageCreator())
            }
            const onNewMessageChange = (body: string) => {
                store.dispatch(UpdateNewMessageBodyCreator(body))
            }

            return <Dialogs
                state={state}
                UpdateNewMessageBody={onNewMessageChange}
                sendMessage={onSendMessageClick}
            />
        }


    }
    </StoreContext.Consumer>
        ;
};

export default DialogsContainer;