import React from 'react';
import {
    InitialStateDialogsType,
    sendMessageActionCreator,
    UpdateNewMessageBodyActionCreator
} from "../../Redux/dialogs-reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";


type mapStateToPropsType = {
    dialogsPage: InitialStateDialogsType
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

/*let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {

    return {
        UpdateNewMessageBody: (body: string) => {
            dispatch(UpdateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}*/

const DialogsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {},
    AppRootStateType>
(mapStateToProps, {
    UpdateNewMessageBody: UpdateNewMessageBodyActionCreator,
    sendMessage: sendMessageActionCreator
},)(Dialogs);

export default DialogsContainer;