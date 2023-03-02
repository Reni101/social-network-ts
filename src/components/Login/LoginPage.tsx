import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../Redux/redux-store'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const authorizedUserID = useAppSelector<number>(state => state.auth.userId!)
	if (isAuth) {
		return <Navigate to={`/profile/${authorizedUserID}`} />
	}

	return (
		<div>
			<LoginForm />
		</div>
	)
}
