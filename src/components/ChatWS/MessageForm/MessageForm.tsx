import React, { useState } from 'react'

import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../../Redux/chat-ws-reducer'
import style from './MessageForm.module.css'

export const MessageForm = () => {
	const dispatch = useDispatch()

	const [messageFromTextArea, setMessageFromTextArea] = useState<string>('')
	const setMessageHandler = (e: any) => {
		setMessageFromTextArea(e.currentTarget.value)
	}
	const sendMessageHandler = async () => {
		if (messageFromTextArea.trim() === '') return // fix
		await dispatch(sendMessage(messageFromTextArea))
		setMessageFromTextArea('')
	}
	return (
		<div className={style.formContainer}>
			<TextArea
				autoSize={true}
				autoFocus
				style={{ width: '300px' }}
				onChange={setMessageHandler}
				value={messageFromTextArea}
			/>

			<Button onClick={sendMessageHandler}>Send message</Button>
		</div>
	)
}
