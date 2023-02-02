import React, {useEffect, useRef, useState} from 'react';
import {ChatMessageType} from "../../../Redux/chat-ws-reducer";
import style from './MessageChat.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/Redux-store";


export const MessagesChat = React.memo(() => {

    const messages = useSelector<AppRootStateType, ChatMessageType[]>(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return (
        <div className={style.messagesContainer} onScroll={scrollHandler}>
            {messages.map((el, index) => {
                return < div key={index + Date.now()} className={style.message}>
                    <img src={el.photo} alt="" className={style.avatar}/>
                    <span className={style.text}>{el.userName}: </span>
                    <span>{el.message}</span>
                </div>
            })}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
});

