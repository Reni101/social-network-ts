import { AppRootStateType } from '../Redux/redux-store'

export const getIsInit = (state: AppRootStateType) => {
	return state.app.initialized
}
export const getError = (state: AppRootStateType) => {
	return state.app.error
}
export const getAppStatus = (state: AppRootStateType) => {
	return state.app.status
}
