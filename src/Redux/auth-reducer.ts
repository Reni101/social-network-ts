import {authAPI, ResultCodeEnum, securityAPI} from "../api/api";
import {AppThunk} from "./Redux-store";

export type initialStateType = typeof initialState

export type ActionsAuthType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof getCaptchaUrlAC>


const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURl: null as string | null
};

export const authReducer = (state = initialState, action: ActionsAuthType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload,
            }
        }
        case 'AUTH/GET_CAPTCHA_URL': {
            return {...state, captchaURl: action.payload.url}
        }
        default:
            return state
    }
}

//========================Action Creator======================

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string
    | null, isAuth: boolean) => ({
    type: 'AUTH/SET_USER_DATA',
    payload: {userId, email, login, isAuth}
} as const)

export const getCaptchaUrlAC = (url: string) => ({
    type: 'AUTH/GET_CAPTCHA_URL',
    payload: {url}
} as const)

//========================Thunk Creator======================

export const getAuthUserDataTC = (): AppThunk => async dispatch => {
    const res = await authAPI.getAuthMe()
    if (res.data.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }


}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha?: string): AppThunk =>
    async dispatch => {
        const res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserDataTC())
        }
        if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURLTC())
        }

    }

export const logoutTC = (): AppThunk => async dispatch => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))

    }
}

export const getCaptchaURLTC = (): AppThunk => async dispatch => {
    const res = await securityAPI.getCaptcha()
    const captchaURL = res.data.url
    dispatch(getCaptchaUrlAC(captchaURL))
}
