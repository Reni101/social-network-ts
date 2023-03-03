import { AppRootStateType } from '../Redux/redux-store'

export const getWsMessages = (state: AppRootStateType) => {
	return state.chat.messages
}
