import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../Redux/redux-store'
import { getStatus } from '../../../../selectors/profile-slectors'
import { EditableStatus } from './EditableStatus/EditableStatus'

type PropsType = {
	isOwner: boolean
}
export const ProfileStatus: FC<PropsType> = ({ isOwner }) => {
	const { t } = useTranslation()
	const statusFromState =
		useAppSelector<string>(getStatus) || t('profile.status not found')

	return (
		<>
			<span>{t('profile.status')}: </span>
			{!isOwner ? <EditableStatus /> : <div>{statusFromState}</div>}
		</>
	)
}
