import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { authAPI, ResultCodeEnum, securityAPI } from '../api/api'
import { AppRootStateType } from './redux-store'
import { setAppError } from './app-reducer'

export const getAuthUserDataTC = createAsyncThunk<
	{ userId: number; email: string; login: string; isAuth: boolean },
	undefined
>('authReducer/getAuthUserDataTC', async (_, { rejectWithValue }) => {
	try {
		const res = await authAPI.getAuthMe()
		if (res.resultCode === ResultCodeEnum.Error) {
			return rejectWithValue('')
		}
		return {
			userId: res.data.id,
			email: res.data.email,
			login: res.data.email,
			isAuth: true
		}
	} catch (e) {
		return rejectWithValue('')
	}
})

export const loginTC = createAsyncThunk<
	undefined,
	{ email: string; password: string; rememberMe: boolean; captcha?: string },
	{ state: AppRootStateType }
>('authReducer/loginTC', async (param, { dispatch, rejectWithValue }) => {
	try {
		const res = await authAPI.login(
			param.email,
			param.password,
			param.rememberMe,
			param.captcha
		)
		if (res.resultCode === ResultCodeEnum.Success) {
			await dispatch(getAuthUserDataTC())
			return
		} else if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
			await dispatch(getCaptchaURLTC())
			return
		} else {
			dispatch(setAppError(res.messages[0]))
			return rejectWithValue('')
		}
	} catch (e) {
		const err = e as Error | AxiosError
		if (axios.isAxiosError(err)) {
			const error = err.response?.data
				? (err.response.data as { error: string }).error
				: err.message
			dispatch(setAppError(error))
		} else {
			dispatch(setAppError(`Native error ${err.message}`))
		}
		return rejectWithValue('')
	}
})

export const logoutTC = createAsyncThunk(
	'authReducer/logoutTC',
	async (_, { rejectWithValue }) => {
		try {
			await authAPI.logout()
			return
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const getCaptchaURLTC = createAsyncThunk<{ url: string }, undefined>(
	'authReducer/getCaptchaURLTC',
	async (_, { rejectWithValue }) => {
		try {
			const res = await securityAPI.getCaptcha()
			return { url: res.data.url }
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

const slice = createSlice({
	name: 'authReducer',
	initialState: {
		userId: null as number | null,
		email: null as string | null,
		login: null as string | null,
		isAuth: false,
		captchaURl: null as string | null
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getAuthUserDataTC.fulfilled, (state, action) => {
				state.userId = action.payload.userId
				state.email = action.payload.email
				state.login = action.payload.login
				state.isAuth = action.payload.isAuth
			})

			.addCase(logoutTC.fulfilled, state => {
				state.userId = null
				state.email = null
				state.login = null
				state.isAuth = false
			})

			.addCase(getCaptchaURLTC.fulfilled, (state, action) => {
				state.captchaURl = action.payload.url
			})
			.addCase(getAuthUserDataTC.rejected, state => {
				state.isAuth = false
			})
})

export const authReducer = slice.reducer
