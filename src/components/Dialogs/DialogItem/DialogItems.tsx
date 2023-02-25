import React, { useEffect } from 'react'
import defaultAvatar from '../../../assets/UsersAvatar.jpg'
import { useAppDispatch, useAppSelector } from '../../../Redux/Redux-store'
import { getAllDialogsTC } from '../../../Redux/dialogs-reducer'
import styles from './DialogItem.module.css'

type PropsType = {
	showMessagesHandler: (userId: number) => void
}

export const DialogItems = (props: PropsType) => {
	const dispatch = useAppDispatch()
	const dialogsData = useAppSelector(state => state.dialogsPage.dialogsData)

	const showMessagesHandler = (userId: number) => {
		props.showMessagesHandler(userId)
	}

	useEffect(() => {
		dispatch(getAllDialogsTC())
	}, [dispatch])
	return (
		<>
			{dialogsData.map(item => {
				return (
					<div
						className={styles.dialogItem_wrapper}
						onClick={() => showMessagesHandler(item.id)}
					>
						<img
							style={{ width: '50px', height: '50px' }}
							src={item.photos.small ? item.photos.small : defaultAvatar}
							alt='avatar'
						/>
						<div>name: {item.userName}</div>
					</div>
				)
			})}
		</>
	)
}
