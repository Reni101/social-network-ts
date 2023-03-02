import { createSelector } from 'reselect'
import { AppRootStateType } from './redux-store'

const getUsers = (state: AppRootStateType) => {
	return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, users => {
	return users
})
export const getPageSize = (state: AppRootStateType) => {
	return state.usersPage.pageSize
}
export const getTotalItemsCount = (state: AppRootStateType) => {
	return state.usersPage.totalItemsCount
}
export const getCurrentPage = (state: AppRootStateType) => {
	return state.usersPage.currentPage
}
export const getFollowingInProgress = (state: AppRootStateType) => {
	return state.usersPage.followingInProgress
}
