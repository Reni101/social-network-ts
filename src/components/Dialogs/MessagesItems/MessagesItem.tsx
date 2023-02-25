import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { getAllMessagesTC, sendMessageTC } from '../../../Redux/dialogs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Redux/Redux-store'
import styles from './MessagesItem.module.css'

type PropsType = {
	userId: number
	showMessagesHandler: (userId: number) => void
}

export const MessagesItem = (props: PropsType) => {
	const dispatch = useAppDispatch()
	const messages = useAppSelector(state => state.dialogsPage.userMessages.items)
	const ownerId = useAppSelector(state => state.profilePage.profile?.userId)
	const [sendMessage, setSendMessage] = useState('')

	const onClickHandler = () => {
		dispatch(sendMessageTC({ userId: props.userId, message: sendMessage }))
		setSendMessage('')
	}

	const goBackHandler = () => {
		props.showMessagesHandler(0)
	}

	const onChangeHandler = (e: any) => {
		setSendMessage(e.currentTarget.value)
	}

	useEffect(() => {
		dispatch(getAllMessagesTC({ userId: props.userId }))
	}, [])

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
						{m.body} viewed: {m.viewed ? 'viewed   ' : 'not viewed   '}
						data:{m.addedAt}
					</div>
				)
			})}

			<Input
				autoFocus
				defaultValue={sendMessage}
				onChange={onChangeHandler}
				value={sendMessage}
			/>
			<Button onClick={onClickHandler}> Send </Button>
			<Button onClick={goBackHandler}> go back </Button>
		</div>
	)
}
