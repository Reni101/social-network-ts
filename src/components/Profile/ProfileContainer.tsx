import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProfileTC, getStatusTC } from '../../Redux/profile-reducer'

import { useAppSelector } from '../../Redux/redux-store'
import { getAuth, getAuthUserId } from '../../selectors/auth-selectors'
import { Profile } from './Profile'

export const ProfileContainer = () => {
	let { userId } = useParams()
	const dispatch = useDispatch()

	const authorizedUserID = useAppSelector<number>(getAuthUserId)
	const isOwner = +userId! === authorizedUserID
	const isAuth = useAppSelector(getAuth)
	const useridForUseEffect = { userid: userId ? userId : authorizedUserID.toString() }

	useEffect(() => {
		dispatch(getProfileTC(useridForUseEffect))
		dispatch(getStatusTC(useridForUseEffect))
	}, [userId])

	// if (!isAuth) {
	// 	return <Navigate to={'/'} />
	// }

	return (
		<div>
			<Profile isOwner={isOwner} />
		</div>
	)
}
