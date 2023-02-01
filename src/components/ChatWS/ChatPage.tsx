import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType, startMessagesListeningTC, stopMessagesListeningTC,

} from "../../Redux/chat-ws-reducer";
import {AppRootStateType} from "../../Redux/Redux-store";
import {Redirect} from "react-router-dom";

export const ChatPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const messages = useSelector<AppRootStateType, ChatMessageType[]>(state => state.chat.messages)

    useEffect(() => {
        dispatch(startMessagesListeningTC())


        return () => {
            dispatch(stopMessagesListeningTC())
        }
    }, [])

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }


    return (
        <div>
            {messages.map(el => {
                return <div>{el.userName} : {el.message}</div>
            })}
        </div>
    );
};
