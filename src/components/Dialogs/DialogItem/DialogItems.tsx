import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import defaultAvatar from '../../../assets/UsersAvatar.svg'
import { useAppDispatch, useAppSelector } from '../../../Redux/redux-store'
import { getAllDialogsTC } from '../../../Redux/dialogs-reducer'
import { Preloader } from '../../../common/Preloader/Preloader'
import { getDialogsData } from '../../../selectors/dialogs-selectors'
import { getAppStatus } from '../../../selectors/app-selectors'
import styles from './DialogItems.module.css'

type PropsType = {
	showMessagesHandler: (userId: number) => void
}

export const DialogItems = memo((props: PropsType) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const dialogsData = useAppSelector(getDialogsData)
	const status = useAppSelector(getAppStatus)

	const showMessagesHandler = (userId: number) => {
		props.showMessagesHandler(userId)
	}

	useEffect(() => {
		dispatch(getAllDialogsTC())
	}, [dispatch])

	if (status === 'loading') {
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
						<div>
							{t('dialogs.name')}: {item.userName}
						</div>
					</div>
				)
			})}
		</>
	)
})
