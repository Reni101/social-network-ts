import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../Redux/redux-store'
import { getAuth } from '../../selectors/auth-selectors'
import { Dialogs } from './Dialogs'

export const DialogsContainer = () => {
	const isAuth = useAppSelector(getAuth)

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<>
			<h2>Dialogs</h2>
			<Dialogs />
		</>
	)
}
