import { AppRootStateType } from '../Redux/redux-store'

export const getAuth = (state: AppRootStateType) => {
	return state.auth.isAuth
}

export const getAuthUserId = (state: AppRootStateType) => {
	return state.auth.userId!
}

export const getLogin = (state: AppRootStateType) => {
	return state.auth.login
}

export const getCaptchaURl = (state: AppRootStateType) => {
	return state.auth.captchaURl
}
