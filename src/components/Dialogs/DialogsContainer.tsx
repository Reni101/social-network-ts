import React from 'react';
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state: any) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch:any) => {
    return {
        UpdateNewMessageBody: (body:any) => {
            dispatch(UpdateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;