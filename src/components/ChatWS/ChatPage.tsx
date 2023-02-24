import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'

import {
	startMessagesListeningTC,
	stopMessagesListeningTC
} from '../../Redux/chat-ws-reducer'
import { AppRootStateType } from '../../Redux/Redux-store'

import style from './ChatPage.module.css'
import { MessageForm } from './MessageForm/MessageForm'
import { MessagesChat } from './Messages/MessagesChat'

export const ChatPage = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)

	useEffect(() => {
		dispatch(startMessagesListeningTC())
		return () => {
			dispatch(stopMessagesListeningTC())
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<MessagesChat />
			<MessageForm />
		</div>
	)
}
