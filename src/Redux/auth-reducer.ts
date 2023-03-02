import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI, ResultCodeEnum, securityAPI } from '../api/api'

export const getAuthUserDataTC = createAsyncThunk(
	'authReducer/getAuthUserDataTC',
	async (_, { rejectWithValue }) => {
		try {
			const res = await authAPI.getAuthMe()
			return {
				userId: res.data.id,
				email: res.data.email,
				login: res.data.email,
				isAuth: true
			}
		} catch (e) {
			return rejectWithValue('')
		}
	}
)

export const loginTC = createAsyncThunk<
	undefined,
	{ email: string; password: string; rememberMe: boolean; captcha?: string }
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
		}
		if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
			await dispatch(getCaptchaURLTC())
			return
		}
	} catch (e) {
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

export const getCaptchaURLTC = createAsyncThunk(
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
})

export const authReducer = slice.reducer
