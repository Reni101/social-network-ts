import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../Redux/Redux-store'
import { Dialogs } from './Dialogs'

export const DialogsContainer = () => {
	const isAuth = useAppSelector(state => state.auth.isAuth)

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<>
			<h2>Dialogs(is progress...)</h2>
			<Dialogs />
		</>
	)
}
