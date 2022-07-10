import {v1} from "uuid";

const SET_USER_DATA = 'SET_USER_DATA'
export type setUserDataACType = {
    type: 'SET_USER_DATA'
    data: {
        userId: string
        email: string
        login: string
    }
}

type initialStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type ActionType = setUserDataACType

const initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action: ActionType) => {
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

export const setAuthUserDataAC = (userId: string, email: string, login: string): setUserDataACType => {
    return {
        type: 'SET_USER_DATA',
        data: {userId, email, login}
    }

}