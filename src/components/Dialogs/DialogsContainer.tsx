import React from 'react'

import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'

import { AppRootStateType } from '../../Redux/Redux-store'

import { Dialogs } from './Dialogs'

export const DialogsContainer = () => {
	const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
	if (!isAuth) {
		return <Navigate to={'/login'} />
	}
	return (
		<>
			<h2>In progress...</h2>
			<Dialogs />
		</>
	)
}
