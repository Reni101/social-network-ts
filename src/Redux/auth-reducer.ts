import {ActionsTypes} from "./Types";

import {authAPI} from "../api/api";
import {AppThunk} from "./Redux-store";
import {stopSubmit} from "redux-form";

export type initialStateType = typeof initialState

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
};

export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload,
            }
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
//========================Thunk Create======================
export const getAuthUserDataTC = (): AppThunk => async dispatch => {
    let res = await authAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        let {id, email, login} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }


}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => async dispatch => {
    let res = await authAPI.login(email, password, rememberMe)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error"
        //@ts-ignore
        dispatch(stopSubmit("login", {_error: message}))
    }

}


export const logoutTC = (): AppThunk => async dispatch => {
    let res = await authAPI.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
