const SET_USER_DATA = 'SET_USER_DATA'
export type setUserDataActionType = {
    type: 'SET_USER_DATA'
    data: {
        userId: string
        email: string
        login: string
    }
}

export type initialStateType2 = typeof initialState

type ActionType = setUserDataActionType

const initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
};

export const authReducer = (state = initialState, action: ActionType): initialStateType2 => {
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

export const setAuthUserDataAC = (userId: string, email: string, login: string): setUserDataActionType => {
    return {
        type: 'SET_USER_DATA',
        data: {userId, email, login}
    }

}