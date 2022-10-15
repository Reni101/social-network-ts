import {ActionsTypes} from "./Types";
import {AppThunk} from "./Redux-store";

import {getAuthUserDataTC} from "./auth-reducer";


export type initialStateType = typeof initialState

const initialState = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED_SUCCESSED':
            return {
                ...state, initialized: action.value
            }
        default:
            return state
    }
}

//========================Action Creator======================
export type setInitializedType = ReturnType<typeof setInitialized>
export const setInitialized = (value: boolean) => ({type: 'SET_INITIALIZED_SUCCESSED', value} as const)

//========================Thunk Create======================
export const InitializeAppTC = (): AppThunk => dispatch => {
    let promise = dispatch(getAuthUserDataTC())
        Promise.all([promise])
        .then(() => {
            dispatch(setInitialized(true))
        })
}

