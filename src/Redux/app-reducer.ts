import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getAuthUserDataTC } from './auth-reducer'
export type appStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = createAsyncThunk<{ value: boolean }, undefined>(
	'appReducer/InitAppTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			let promise = dispatch(getAuthUserDataTC())
			await Promise.all([promise])
			return { value: true }
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'appReducer',
	initialState: {
		initialized: false,
		error: null as string | null,
		status: 'idle' as appStatusType
	},
	reducers: {
		setAppError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		setAppStatus(state, action: PayloadAction<appStatusType>) {
			state.status = action.payload
		}
	},
	extraReducers: builder =>
		builder.addCase(initializeAppTC.fulfilled, (state, action) => {
			state.initialized = action.payload.value
		})
})
export const appReducer = slice.reducer
export const { setAppError, setAppStatus } = slice.actions
