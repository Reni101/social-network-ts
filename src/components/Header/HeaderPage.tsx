import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Layout, theme } from 'antd'
import { logoutTC } from '../../Redux/auth-reducer'
import { useAppSelector } from '../../Redux/redux-store'
import styleH from './Header.module.css'

const { Header } = Layout

export const HeaderPage = () => {
	const dispatch = useDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const login = useAppSelector(state => state.auth.login)
	const logoutHandler = () => {
		dispatch(logoutTC())
	}

	const {
		token: { colorBgContainer }
	} = theme.useToken()
	return (
		<div className={styleH.header}>
			<Header style={{ padding: 0, background: colorBgContainer }}>
				<div className={styleH.loginBlock}>
					{isAuth ? (
						<div>
							{login} - <Button onClick={logoutHandler}>Log out</Button>
						</div>
					) : (
						<NavLink to='/login'>Login </NavLink>
					)}
				</div>
			</Header>
		</div>
	)
}
