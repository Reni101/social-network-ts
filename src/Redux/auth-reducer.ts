import { createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleAsyncServerNetworkError, handleServerAppError } from 'utils/error-utils'
import { authAPI, securityAPI } from 'api/auth-api'
import { ResultCodeEnum } from 'Enums/ResultCode'
import { setAppStatus } from './app-reducer'

export const getAuthUserDataTC = createAppAsyncThunk<
	{ userId: number; email: string; login: string; isAuth: boolean },
	void
>('authReducer/getAuthUserDataTC', async (_, { dispatch, rejectWithValue }) => {
	try {
		const res = await authAPI.getAuthMe()
		if (res.resultCode === ResultCodeEnum.Success) {
			return {
				userId: res.data.id,
				email: res.data.email,
				login: res.data.login,
				isAuth: true
			}
		} else {
			return handleServerAppError(res.messages, dispatch, rejectWithValue)
		}
	} catch (e) {
		return handleAsyncServerNetworkError(
			e as Error | AxiosError,
			dispatch,
			rejectWithValue
		)
	}
})

export const loginTC = createAppAsyncThunk<
	void,
	{ email: string; password: string; rememberMe: boolean; captcha?: string }
>('', async (param, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setAppStatus('loading'))
		const res = await authAPI.login(
			param.email,
			param.password,
			param.rememberMe,
			param.captcha
		)
		if (res.resultCode === ResultCodeEnum.Success) {
			await dispatch(getAuthUserDataTC())
			dispatch(setAppStatus('succeeded'))
			return
		} else if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
			await dispatch(getCaptchaURLTC())
		} else {
			return handleServerAppError(res.messages, dispatch, rejectWithValue)
		}
	} catch (e) {
		return handleAsyncServerNetworkError(
			e as Error | AxiosError,
			dispatch,
			rejectWithValue
		)
	}
})
export const logoutTC = createAppAsyncThunk(
	'authReducer/logoutTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setAppStatus('loading'))
			const res = await authAPI.logout()
			if (res.resultCode === ResultCodeEnum.Success) {
				dispatch(setAppStatus('succeeded'))
			} else {
				return handleServerAppError(res.messages, dispatch, rejectWithValue)
			}
		} catch (e) {
			return handleAsyncServerNetworkError(
				e as Error | AxiosError,
				dispatch,
				rejectWithValue
			)
		}
	}
)
export const getCaptchaURLTC = createAppAsyncThunk<{ url: string }, void>(
	'authReducer/getCaptchaURLTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setAppStatus('loading'))
			const res = await securityAPI.getCaptcha()
			return { url: res.data.url }
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
	name: 'authReducer',
	initialState: {
		userId: null as number | null,
		email: null as string | null,
		login: null as string | null,
		isAuth: false,
		captchaURl: null as string | null
	},
	reducers: {},
	extraReducers: builder => {
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
	}
})

export const authReducer = slice.reducer
