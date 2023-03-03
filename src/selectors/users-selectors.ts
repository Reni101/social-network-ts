import { AppRootStateType } from '../Redux/redux-store'

export const getUsers = (state: AppRootStateType) => {
	return state.users.users
}
export const getUsersPageSize = (state: AppRootStateType) => {
	return state.users.pageSize
}
export const getUsersTotalItemsCount = (state: AppRootStateType) => {
	return state.users.totalItemsCount
}
export const getUsersCurrentPage = (state: AppRootStateType) => {
	return state.users.currentPage
}
export const getFollowingInProgress = (state: AppRootStateType) => {
	return state.users.followingInProgress
}
