import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../Redux/redux-store'
import { ProfileType } from '../../Redux/types'

import { getProfile } from '../../selectors/profile-slectors'
import { getAuthUserId } from '../../selectors/auth-selectors'
import { getProfileTC, getStatusTC } from '../../Redux/profile-reducer'
import styleP from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

export const Profile = () => {
	const { userId } = useParams()
	const dispatch = useDispatch()

	const profile = useAppSelector<ProfileType>(getProfile)
	const authorizedUserID = useAppSelector<number>(getAuthUserId)
	const isOwner = +userId! === authorizedUserID
	const useridForUseEffect = { userid: userId ? userId : authorizedUserID.toString() }

	useEffect(() => {
		dispatch(getProfileTC(useridForUseEffect))
		dispatch(getStatusTC(useridForUseEffect))
	}, [dispatch, userId])

	return (
		<div className={styleP.profileContainer}>
			<ProfileInfo isOwner={isOwner} profile={profile} />
		</div>
	)
}
