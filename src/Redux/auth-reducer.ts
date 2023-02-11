import { authAPI, ResultCodeEnum, securityAPI } from '../api/api'
import { AppDispatch } from './Redux-store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'authReducer',
	initialState: {
		userId: null as number | null,
		email: null as string | null,
		login: null as string | null,
		isAuth: false,
		captchaURl: null as string | null
	},
	reducers: {
		setAuthUserDataAC(
			state,
			action: PayloadAction<{
				userId: number | null
				email: string | null
				login: string | null
				isAuth: boolean
			}>
		) {
			state.userId = action.payload.userId
			state.email = action.payload.email
			state.login = action.payload.login
			state.isAuth = action.payload.isAuth
		},
		getCaptchaUrlAC(state, action: PayloadAction<{ url: string }>) {
			state.captchaURl = action.payload.url
		}
	}
})

export const authReducer = slice.reducer
export const { getCaptchaUrlAC, setAuthUserDataAC } = slice.actions

export const getAuthUserDataTC = () => async (dispatch: AppDispatch) => {
	const res = await authAPI.getAuthMe()
	if (res.resultCode === ResultCodeEnum.Success) {
		let { id, email, login } = res.data
		dispatch(setAuthUserDataAC({ userId: id, email, login, isAuth: true }))
	}
}

export const loginTC =
	(email: string, password: string, rememberMe: boolean, captcha?: string) =>
	async (dispatch: AppDispatch) => {
		const res = await authAPI.login(email, password, rememberMe, captcha)
		if (res.resultCode === ResultCodeEnum.Success) {
			await dispatch(getAuthUserDataTC())
		}
		if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
			dispatch(getCaptchaURLTC())
		}
	}

export const logoutTC = () => async (dispatch: AppDispatch) => {
	const res = await authAPI.logout()
	if (res.data.resultCode === 0) {
		dispatch(
			setAuthUserDataAC({
				userId: null,
				email: null,
				login: null,
				isAuth: false
			})
		)
	}
}

export const getCaptchaURLTC = () => async (dispatch: AppDispatch) => {
	const res = await securityAPI.getCaptcha()
	const url = res.data.url
	dispatch(getCaptchaUrlAC({ url }))
}
