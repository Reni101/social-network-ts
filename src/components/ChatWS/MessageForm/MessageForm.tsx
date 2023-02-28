import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux'

import { sendMessage } from '../../../Redux/chat-ws-reducer'

import style from './MessageForm.module.css'

export const MessageForm = () => {
	const dispatch = useDispatch()

	const [messageFromInput, setMessageFromInput] = useState<string>('')
	const setMessageHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setMessageFromInput(e.currentTarget.value)
	}
	const sendMessageHandler = () => {
		if (messageFromInput.trim() === '') return // fix
		dispatch(sendMessage(messageFromInput))
		setMessageFromInput('')
	}
	return (
		<div className={style.formContainer}>
			<Input
				autoFocus
				style={{ width: '300px' }}
				onChange={setMessageHandler}
				value={messageFromInput}
			/>

			<Button onClick={sendMessageHandler}>Send message</Button>
		</div>
	)
}
