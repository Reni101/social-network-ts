import React, { FC } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../Redux/redux-store'
import { startNewDialogs } from '../../../Redux/dialogs-reducer'

type PropsType = {
	userId: number
}
export const StartDialog: FC<PropsType> = ({ userId }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const writeMessageHandler = async () => {
		await dispatch(startNewDialogs({ userId }))
		navigate(`/dialogs?userIdChat=${userId}`)
	}

	return (
		<>
			<Button onClick={writeMessageHandler}>{t('profile.write message')}</Button>
		</>
	)
}
