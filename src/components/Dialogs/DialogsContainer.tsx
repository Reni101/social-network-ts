import React from 'react';
import {
    InitialStateDialogsType,
    sendMessageActionCreator,
} from "../../Redux/dialogs-reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type mapStateToPropsType = {
    dialogsPage: InitialStateDialogsType

}

type mapDispatchToPropsType = {

    sendMessage: (messageBody:string) => void
}

let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {
        sendMessage: sendMessageActionCreator
    }),
    WithAuthRedirect
)(Dialogs);