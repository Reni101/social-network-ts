import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../Login/LoginPage'
import { ChatPage } from '../ChatWS/ChatPage'
import { NotFoundPage } from '../NotFound/NotFoundPage'
import { UsersPage } from '../Users/UsersPage'
import { Path } from '../../Enums/Path'
import { ProtectedRoute } from '../../common/ProtectedRoute/ProtectedRoute'
import { Profile } from '../Profile/Profile'
import { Dialogs } from '../Dialogs/Dialogs'
import style from './Routers.module.css'

export const Routers = () => {
	return (
		<div className={style.routes}>
			<Routes>
				<Route path={Path.LOGIN} element={<LoginPage />} />
				<Route path={Path.NOTFOUND} element={<NotFoundPage />} />
				<Route
					path='*'
					element={
						<ProtectedRoute>
							<Routes>
								<Route
									path={`${Path.PROFILE}/:userId`}
									element={<Profile />}
								/>
								<Route path={Path.DIALOGS} element={<Dialogs />} />
								<Route path={Path.USERS} element={<UsersPage />} />
								<Route path={Path.CHAT} element={<ChatPage />} />
							</Routes>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	)
}
