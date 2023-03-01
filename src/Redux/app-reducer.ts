import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getAuthUserDataTC } from './auth-reducer'

export const initializeAppTC = createAsyncThunk(
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
		initialized: false
	},
	reducers: {},
	extraReducers: builder =>
		builder.addCase(initializeAppTC.fulfilled, (state, action) => {
			state.initialized = action.payload.value
		})
})
export const appReducer = slice.reducer
