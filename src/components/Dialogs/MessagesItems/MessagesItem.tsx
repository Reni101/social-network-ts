import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import {
	clearUserMessagesAC,
	getMessagesFromUserTC,
	sendMessageTC
} from '../../../Redux/dialogs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Redux/Redux-store'
import styles from './MessagesItem.module.css'

export const MessagesItem = () => {
	const dispatch = useAppDispatch()
	const messages = useAppSelector(state => state.dialogsPage.userMessages.items)
	const ownerId = useAppSelector(state => state.auth.userId)
	const totalMessagesCount = useAppSelector(
		state => state.dialogsPage.userMessages.totalCount
	)

	const [searchParams, setSearchParams] = useSearchParams()
	const userId = Number(searchParams.get('userIdChat') || '')
	const [sendMessage, setSendMessage] = useState('')

	const sendMessageHandler = () => {
		dispatch(sendMessageTC({ userId, message: sendMessage }))
		setSendMessage('')
	}

	const goBackHandler = () => {
		setSearchParams({ userIdChat: '' })
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSendMessage(e.currentTarget.value)
	}

	const nextPageHandler = () => {
		dispatch(getMessagesFromUserTC({ userId }))
	}

	useEffect(() => {
		dispatch(getMessagesFromUserTC({ userId }))
		return () => {
			dispatch(clearUserMessagesAC())
		}
	}, [dispatch])

	if (!messages.length) {
		return <Spin tip='Loading' size='large'></Spin>
	}

	return (
		<div className={styles.wrapper}>
			{messages.map(m => {
				return (
					<div key={m.id} className={styles.message}>
						<div
							className={
								ownerId === m.senderId ? styles.owner : styles.userName
							}
						>
							{m.senderName}{' '}
						</div>{' '}
						<b>{m.body}</b> viewed: {m.viewed ? 'viewed   ' : 'not viewed   '}
						data:{m.addedAt}
					</div>
				)
			})}

			<TextArea
				autoFocus
				defaultValue={sendMessage}
				onChange={onChangeHandler}
				value={sendMessage}
			/>
			<Button onClick={sendMessageHandler}> Send </Button>
			<Button onClick={goBackHandler}> go back </Button>
			<Button
				onClick={nextPageHandler}
				disabled={messages.length >= totalMessagesCount}
			>
				show more
			</Button>
		</div>
	)
}
