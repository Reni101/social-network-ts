import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '../../common/Container/Container'
import { DialogItems } from './DialogItem/DialogItems'
import { MessagesItem } from './MessagesItems/MessagesItem'

export const Dialogs = () => {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const userIdForChat = searchParams.get('userIdChat') || 0

	const showMessagesHandler = (userId: number) => {
		setSearchParams({ userIdChat: userId.toString() })
	}

	return (
		<>
			<h2>{t('dialogs')}</h2>
			<Container>
				{!!userIdForChat ? (
					<MessagesItem />
				) : (
					<DialogItems showMessagesHandler={showMessagesHandler} />
				)}
			</Container>
		</>
	)
}
