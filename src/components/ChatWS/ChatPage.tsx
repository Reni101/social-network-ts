import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import {
	startMessagesListeningTC,
	stopMessagesListeningTC
} from '../../Redux/chat-ws-reducer'

import { Container } from '../../common/Container/Container'
import { useAppDispatch, useAppSelector } from '../../Redux/redux-store'
import style from './ChatPage.module.css'
import { MessageForm } from './MessageForm/MessageForm'
import { MessagesChat } from './Messages/MessagesChat'

export const ChatPage = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)

	useEffect(() => {
		dispatch(startMessagesListeningTC())
		return () => {
			dispatch(stopMessagesListeningTC())
		}
	}, [dispatch])

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<Container className={style.chatWS}>
			<MessagesChat />
			<MessageForm />
		</Container>
	)
}
