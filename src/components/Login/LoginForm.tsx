import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { loginTC } from '../../Redux/auth-reducer'
import { useAppSelector } from '../../Redux/redux-store'
import { getCaptchaURl } from '../../selectors/auth-selectors'
import style from './loginForm.module.css'

type FormikErrorType = {
	login?: string
	password?: string
	rememberMe?: boolean
	captcha?: string | null
}

export const LoginForm = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const captchaURl = useAppSelector<string | null>(getCaptchaURl)

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
			rememberMe: true,
			captcha: ''
		},
		onSubmit: values => {
			dispatch(
				loginTC({
					email: values.login,
					password: values.password,
					rememberMe: values.rememberMe,
					captcha: values.captcha
				})
			)
		},

		validate: (values: FormikErrorType) => {
			const errors: FormikErrorType = {}
			if (!values.login) {
				errors.login = 'Required'
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
				errors.login = 'Invalid email address'
			}

			if (!values.password) {
				errors.password = 'Required'
			} else if (values.password.length < 3) {
				errors.password = `password must be at least ${3} characters long `
			}
			return errors
		}
	})
	return (
		<div className={style.containerLogin}>
			<form onSubmit={formik.handleSubmit}>
				<h2>{t('login.login')}</h2>

				<Input
					name='login'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.login}
					placeholder='Email'
				/>
				{formik.touched.login && formik.errors.login && (
					<div style={{ color: 'red' }}>{formik.errors.login}</div>
				)}

				<h2>{t('login.password')}</h2>

				<Input.Password
					autoComplete='on'
					name='password'
					type='password'
					onChange={formik.handleChange}
					value={formik.values.password}
					placeholder='Password'
				/>
				{formik.touched.password && formik.errors.password && (
					<div style={{ color: 'red' }}>{formik.errors.password}</div>
				)}

				<Checkbox
					name='rememberMe'
					onChange={formik.handleChange}
					checked={formik.values.rememberMe}
				>
					{t('login.rememberMe')}
				</Checkbox>

				{captchaURl && (
					<div>
						<img src={captchaURl} alt='captcha' />
					</div>
				)}
				{captchaURl && (
					<Input
						placeholder='enter the captcha'
						type='text'
						name='captcha'
						onChange={formik.handleChange}
						value={formik.values.captcha}
					/>
				)}
				<div>
					<Button htmlType='submit'>{t('login.signIn')}</Button>
				</div>
				<p>
					{t('login.to login in')}
					<a
						href={'https://social-network.samuraijs.com/'}
						target={'_blank'}
						rel='noreferrer'
					>
						{' '}
						{t('login.here')}
					</a>
				</p>
				<p>{t('login.or use common')}:</p>
				<p>{t('common.email')}: free@samuraijs.com</p>
				<p>{t('login.password')}: free</p>
			</form>
		</div>
	)
}
