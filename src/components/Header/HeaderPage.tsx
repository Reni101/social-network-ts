import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Layout, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { logoutTC } from '../../Redux/auth-reducer'
import { useAppSelector } from '../../Redux/redux-store'
import { getAuth, getLogin } from '../../selectors/auth-selectors'
import styleH from './Header.module.css'

const { Header } = Layout

export const HeaderPage = () => {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const isAuth = useAppSelector(getAuth)
	const login = useAppSelector(getLogin)

	const logoutHandler = () => {
		dispatch(logoutTC())
	}

	const changeLanguage = (language: 'en' | 'ru') => {
		i18n.changeLanguage(language)
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
						<NavLink to='/login'>{t('login.login')} </NavLink>
					)}

					<button
						onClick={() => {
							changeLanguage('en')
						}}
					>
						en
					</button>
					<button
						onClick={() => {
							changeLanguage('ru')
						}}
					>
						ru
					</button>
				</div>
			</Header>
		</div>
	)
}
