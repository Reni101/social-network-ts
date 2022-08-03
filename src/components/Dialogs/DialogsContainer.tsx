import React from 'react';
import {
    InitialStateDialogsType,
    sendMessageActionCreator,
    UpdateNewMessageBodyActionCreator
} from "../../Redux/dialogs-reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {Redirect} from "react-router-dom";


type mapStateToPropsType = {
    dialogsPage: InitialStateDialogsType
    isAuth:boolean
}

type mapDispatchToPropsType = {
    UpdateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

let AuthRedirectComponent =(props:mapStateToPropsType & mapDispatchToPropsType)=>{
    debugger
    if (!props.isAuth) return <Redirect to={'/login'}/>
    return <Dialogs {...props}/>
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
},)(AuthRedirectComponent);

export default DialogsContainer;