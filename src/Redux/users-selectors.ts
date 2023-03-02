import { createSelector } from 'reselect'
import { AppRootStateType } from './redux-store'

const getUsers = (state: AppRootStateType) => {
	return state.users.users
}
export const getUsersSelector = createSelector(getUsers, users => {
	return users
})
export const getPageSize = (state: AppRootStateType) => {
	return state.users.pageSize
}
export const getTotalItemsCount = (state: AppRootStateType) => {
	return state.users.totalItemsCount
}
export const getCurrentPage = (state: AppRootStateType) => {
	return state.users.currentPage
}
export const getFollowingInProgress = (state: AppRootStateType) => {
	return state.users.followingInProgress
}
