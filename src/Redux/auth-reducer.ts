import {ActionsTypes} from "./Types";

import {authAPI, securityAPI} from "../api/api";
import {AppThunk} from "./Redux-store";

export type initialStateType = typeof initialState

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURl: null as string | null
};

export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
export type setUserDataActionType = {
    type: 'AUTH/SET_USER_DATA'
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataActionType => {
    return {
        type: 'AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    }

}

export  type getCaptchaUrlACType = {
    type: 'AUTH/GET_CAPTCHA_URL',
    payload: {
        url: string
    }
}
export const getCaptchaUrlAC = (url: string): getCaptchaUrlACType => {
    return {
        type: 'AUTH/GET_CAPTCHA_URL',
        payload: {url}
    }

}
//========================Thunk Create======================
export const getAuthUserDataTC = (): AppThunk => async dispatch => {
    const res = await authAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        let {id, email, login} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }


}

export const loginTC = (email: string, password: string, rememberMe: boolean,captcha?:string): AppThunk => async dispatch => {
    const res = await authAPI.login(email, password, rememberMe,captcha)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    }
    if (res.data.resultCode === 10) {
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
