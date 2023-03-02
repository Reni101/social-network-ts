import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { dialogsReducer } from './dialogs-reducer'
import { authReducer } from './auth-reducer'
import { profileReducer } from './profile-reducer'
import { usersReducer } from './users-reducer'
import { appReducer } from './app-reducer'
import { chatWSReducer } from './chat-ws-reducer'

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		dialogs: dialogsReducer,
		users: usersReducer,
		auth: authReducer,
		app: appReducer,
		chat: chatWSReducer
	}
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store
