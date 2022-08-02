import {ActionsTypes} from "./Types";
import {Dispatch} from "react";
import {authAPI} from "../api/api";


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
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

//========================Action Creator======================
export type setUserDataActionType = {
    type: 'SET_USER_DATA'
    data: {
        userId: number
        email: string
        login: string
    }
}
export const setAuthUserDataAC = (userId: number, email: string, login: string): setUserDataActionType => {
    return {
        type: 'SET_USER_DATA',
        data: {userId, email, login}
    }

}
//========================Thunk======================
export const getAuthUserDataThunkCreator = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        authAPI.getAuthMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            })
    }
}