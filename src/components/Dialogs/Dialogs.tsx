import React, { useState } from 'react'
import styles from './Dialogs.module.css'
import { DialogItems } from './DialogItem/DialogItems'
import { MessagesItem } from './MessagesItems/MessagesItem'

export const Dialogs = () => {
	const [showMessages, setShowMessages] = useState<boolean>(false)
	const [userIdForShow, setUserIdForShow] = useState<number>(0)

	const showMessagesHandler = (userId: number) => {
		setUserIdForShow(userId)
		setShowMessages(prevState => !prevState)
	}

	return (
		<div className={styles.wrapper}>
			{showMessages ? (
				<MessagesItem
					userId={userIdForShow}
					showMessagesHandler={showMessagesHandler}
				/>
			) : (
				<DialogItems showMessagesHandler={showMessagesHandler} />
			)}
		</div>
	)
}
