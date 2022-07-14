import React from 'react';
import {sendMessageCreator, UpdateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DialogsPageType} from "../../Redux/Types";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../Redux/Redux-store";


type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type mapDispatchToPropsType = {
    UpdateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {

    return {
        UpdateNewMessageBody: (body: string) => {
            dispatch(UpdateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;