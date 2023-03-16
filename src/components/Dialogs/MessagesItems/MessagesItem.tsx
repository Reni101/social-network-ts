import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import {
	clearUserMessagesAC,
	getMessagesFromUserTC,
	sendMessageTC
} from '../../../Redux/dialogs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Redux/redux-store'
import {
	getMessageItems,
	getMessageTotalCount
} from '../../../selectors/dialogs-selectors'
import { getAuthUserId } from '../../../selectors/auth-selectors'
import { getAppStatus } from '../../../selectors/app-selectors'
import check from '../../../assets/mark/check.svg'
import cansel from '../../../assets/mark/cross-circle.svg'
import styles from './MessagesItem.module.css'

export const MessagesItem = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const messages = useAppSelector(getMessageItems)
	const ownerId = useAppSelector(getAuthUserId)
	const totalMessagesCount = useAppSelector(getMessageTotalCount)
	const status = useAppSelector(getAppStatus)

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

	if (status === 'loading') {
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
							{m.senderName}
						</div>
						<b>{m.body}</b>
						<div className={styles.viewed}>
							{t('dialogs.viewed') + ': '}
							<img src={m.viewed ? check : cansel} alt='mark' />
						</div>
						<div>
							{t('dialogs.sent') +
								': ' +
								dayjs(m.addedAt).format('DD.MM.YYYY')}
						</div>
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
