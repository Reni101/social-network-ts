import { AppRootStateType } from '../Redux/redux-store'

export const getProfile = (state: AppRootStateType) => {
	return state.profile.profile!
}
export const getStatus = (state: AppRootStateType) => {
	return state.profile.status
}
