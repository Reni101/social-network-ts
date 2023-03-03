import { AppRootStateType } from '../Redux/redux-store'

export const getMessageItems = (state: AppRootStateType) => {
	return state.dialogs.userMessages.items
}
export const getMessageTotalCount = (state: AppRootStateType) => {
	return state.dialogs.userMessages.totalCount
}
export const getDialogsData = (state: AppRootStateType) => {
	return state.dialogs.dialogsData
}
