import React from 'react'

import { useSelector } from 'react-redux'

import { DialogsPageType } from '../../Redux/Types'

import { AppRootStateType } from '../../Redux/Redux-store'

import styleDi from './Dialogs.module.css'
import Message from './MessageItem/Dialogs'

import { DialogItem } from './Dialogitem/DialogItem'
import { AddMessageForm } from './AddMessageForm'

export const Dialogs = () => {
	const dialogsPage = useSelector<AppRootStateType, DialogsPageType>(
		state => state.dialogsPage
	)

	const mapDialogsItem = dialogsPage.dialogsData.map(e => {
		return <DialogItem name={e.name} id={e.id} key={e.id} />
	})
	const mapMessageElement = dialogsPage.messagesData.map(e => {
		return <Message message={e.message} id={e.id} key={e.id} />
	})

	return (
		<div className={styleDi.dialogs}>
			<div className={styleDi.dialogs_items}>{mapDialogsItem}</div>

			<div className={styleDi.messages}>
				<div> {mapMessageElement} </div>
				<AddMessageForm />
			</div>
		</div>
	)
}
