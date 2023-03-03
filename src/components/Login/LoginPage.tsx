import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../Redux/redux-store'
import { getAuth, getAuthUserId } from '../../selectors/auth-selectors'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
	const isAuth = useAppSelector(getAuth)
	const authorizedUserID = useAppSelector<number>(getAuthUserId)
	if (isAuth) {
		return <Navigate to={`/profile/${authorizedUserID}`} />
	}

	return (
		<div>
			<LoginForm />
		</div>
	)
}
