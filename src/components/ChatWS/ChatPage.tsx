import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType, startMessagesListeningTC, stopMessagesListeningTC,

} from "../../Redux/chat-ws-reducer";
import {AppRootStateType} from "../../Redux/Redux-store";

export const ChatPage = () => {
    const dispatch = useDispatch()
    const messages = useSelector<AppRootStateType, ChatMessageType[]>(state => state.chat.messages)

    useEffect(() => {
        dispatch(startMessagesListeningTC())


        return () => {
            dispatch(stopMessagesListeningTC())
        }
    }, [])


    return (
        <div>
            {messages.map(el => {
                return el.message
            })}
        </div>
    );
};
