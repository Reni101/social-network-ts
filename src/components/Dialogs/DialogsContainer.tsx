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
    isAuth:boolean
}

type mapDispatchToPropsType = {
    UpdateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth:state.auth.isAuth
    }
}

const DialogsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {},
    AppRootStateType>
(mapStateToProps, {
    UpdateNewMessageBody: UpdateNewMessageBodyActionCreator,
    sendMessage: sendMessageActionCreator
},)(Dialogs);

export default DialogsContainer;