import React, { useState } from 'react'
import { Container } from '../../common/Container/Container'

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
		<Container>
			{showMessages ? (
				<MessagesItem
					userId={userIdForShow}
					showMessagesHandler={showMessagesHandler}
				/>
			) : (
				<DialogItems showMessagesHandler={showMessagesHandler} />
			)}
		</Container>
	)
}
