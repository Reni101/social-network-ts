import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleAsyncServerNetworkError } from 'utils/error-utils'
import { getAuthUserDataTC } from './auth-reducer'

export type appStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = createAppAsyncThunk<{ value: boolean }, void>(
	'appReducer/initializeAppTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const promise = dispatch(getAuthUserDataTC())
			await Promise.all([promise])
			dispatch(setAppError(null))
			return { value: true }
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
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
	extraReducers: builder => {
		builder.addCase(initializeAppTC.fulfilled, (state, action) => {
			state.initialized = action.payload.value
		})
	}
})
export const appReducer = slice.reducer
export const { setAppError, setAppStatus } = slice.actions
