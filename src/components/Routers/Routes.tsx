import React from 'react'
import style from './Routers.module.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProfileContainer } from '../Profile/ProfileContainer'
import { DialogsContainer } from '../Dialogs/DialogsContainer'
import { LoginPage } from '../Login/LoginPage'
import { ChatPage } from '../ChatWS/ChatPage'
import { NotFoundPage } from '../NotFound/NotFoundPage'
import { UsersPage } from '../Users/UsersPage'

export const Routers = () => {
	return (
		<div className={style.routes}>
			<Routes>
				<Route path='/profile/:userId?' element={<ProfileContainer />} />
				<Route path='/dialogs' element={<DialogsContainer />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/chat' element={<ChatPage />} />
				<Route path='/notFound' element={<NotFoundPage />} />
				<Route path='*' element={<Navigate to={`/notFound`} />} />
			</Routes>
		</div>
	)
}
