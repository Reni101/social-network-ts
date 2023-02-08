import { AppDispatch } from './Redux-store'
import { getAuthUserDataTC } from './auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'appReducer',
	initialState: { initialized: false },
	reducers: {
		setInitialized(state, action: PayloadAction<{ value: boolean }>) {
			state.initialized = action.payload.value
		}
	}
})
export const appReducer = slice.reducer
export const { setInitialized } = slice.actions

//========================Thunk Creator======================
export const InitializeAppTC = () => (dispatch: AppDispatch) => {
	let promise = dispatch(getAuthUserDataTC())
	Promise.all([promise]).then(() => {
		dispatch(setInitialized({ value: true }))
	})
}
