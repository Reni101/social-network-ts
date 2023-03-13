import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProfileContainer } from '../Profile/ProfileContainer'
import { DialogsContainer } from '../Dialogs/DialogsContainer'
import { LoginPage } from '../Login/LoginPage'
import { ChatPage } from '../ChatWS/ChatPage'
import { NotFoundPage } from '../NotFound/NotFoundPage'
import { UsersPage } from '../Users/UsersPage'
import { Path } from '../../Enums/Path'
import { ProtectedRoute } from '../../common/ProtectedRoute/ProtectedRoute'
import style from './Routers.module.css'

export const Routers = () => {
	return (
		<div className={style.routes}>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/notFound' element={<NotFoundPage />} />
				<Route
					path='*'
					element={
						<ProtectedRoute>
							<Routes>
								<Route
									path={`${Path.PROFILE}/:userId`}
									element={<ProfileContainer />}
								/>
								<Route path='/dialogs' element={<DialogsContainer />} />
								<Route path='/users' element={<UsersPage />} />
								<Route path='/chat' element={<ChatPage />} />
							</Routes>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	)
}
