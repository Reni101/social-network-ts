import React, { memo, useEffect } from 'react'
import defaultAvatar from '../../../assets/UsersAvatar.jpg'
import { useAppDispatch, useAppSelector } from '../../../Redux/Redux-store'
import { getAllDialogsTC } from '../../../Redux/dialogs-reducer'
import { Preloader } from '../../../common/Preloader/Preloader'
import styles from './DialogItem.module.css'

type PropsType = {
	showMessagesHandler: (userId: number) => void
}

export const DialogItems = memo((props: PropsType) => {
	const dispatch = useAppDispatch()
	const dialogsData = useAppSelector(state => state.dialogsPage.dialogsData)

	const showMessagesHandler = (userId: number) => {
		props.showMessagesHandler(userId)
	}

	useEffect(() => {
		dispatch(getAllDialogsTC())
	}, [dispatch])

	if (!dialogsData.length) {
		return <Preloader />
	}

	return (
		<>
			{dialogsData.map(item => {
				return (
					<div
						key={item.id}
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
})
