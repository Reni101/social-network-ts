import {ActionsTypes} from "./Types";

import {authAPI} from "../api/api";
import {AppThunk} from "./Redux-store";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'SET_USER_DATA'


export type initialStateType = typeof initialState

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
};

export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
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
    type: 'SET_USER_DATA'
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataActionType => {
    return {
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    }

}
//========================Thunk Create======================
export const getAuthUserDataTC = (): AppThunk => {
    return (dispatch) => {
        authAPI.getAuthMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthUserDataTC())
                } else  {
                    //@ts-ignore
                    dispatch(stopSubmit("login",{_error:"Email or password is wrong"}))
                }
            })
    }
}

export const logoutTC = (): AppThunk => {
    return (dispatch) => {
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null, false))
                }
            })
    }
}