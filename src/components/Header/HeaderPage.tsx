import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Layout, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { logoutTC } from '../../Redux/auth-reducer'
import { useAppSelector } from '../../Redux/redux-store'
import { getAuth, getLogin } from '../../selectors/auth-selectors'
import styleH from './Header.module.css'

const { Header } = Layout

export const HeaderPage = () => {
	const dispatch = useDispatch()
	const { Option } = Select
	const { t, i18n } = useTranslation()
	const isAuth = useAppSelector(getAuth)
	const login = useAppSelector(getLogin)

	const logoutHandler = () => {
		dispatch(logoutTC())
	}

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	return (
		<>
			<Header style={{ background: 'white' }}>
				<div className={styleH.loginBlock}>
					{isAuth ? (
						<div>
							{login} -{' '}
							<Button onClick={logoutHandler}>{t('common.logOut')}</Button>
						</div>
					) : (
						<NavLink to='/login'>{t('login.login')} </NavLink>
					)}

					<Select
						defaultValue={i18n.language.slice(0, 2)}
						className={styleH.select}
						onChange={changeLanguage}
					>
						<Option value='ru' className={styleH.menu}>
							ru
						</Option>
						<Option value='en'>en</Option>
					</Select>
				</div>
			</Header>
		</>
	)
}
