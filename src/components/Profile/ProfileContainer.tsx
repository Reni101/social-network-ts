import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { getProfileTC, getStatusTC } from '../../Redux/profile-reducer'

import { useAppSelector } from '../../Redux/Redux-store'
import { Profile } from './Profile'

export const ProfileContainer = () => {
	let { userId } = useParams()
	const dispatch = useDispatch()

	const authorizedUserID = useAppSelector<number>(state => state.auth.userId!)
	const isOwner = +userId! === authorizedUserID
	const isAuth = useAppSelector(state => state.auth.isAuth)

	useEffect(() => {
		dispatch(getProfileTC(userId ? userId : authorizedUserID.toString()))
		dispatch(getStatusTC(userId ? userId : authorizedUserID.toString()))
	}, [userId])

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<div>
			<Profile isOwner={isOwner} />
		</div>
	)
}
