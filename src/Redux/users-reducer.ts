import {v1} from "uuid";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET USERS"

let initialState: StateType = {
    users: [
       ]
}

export type UsersType = {
    id: string,
    photoURL:string,
    followed: boolean,
    fullName: string,
    status: string,
    location: { city: string, country: string }
}
type StateType = {
    users: Array<UsersType>
}

const UsersReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW: {
            debugger
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ? {...el, followed: false} : el)
            }

        }
        case UNFOLLOW : {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ? {...el, followed: true} : el)
            }
        }
        case SET_USERS: {
            return {...state,users:[...state.users, ...action.users]}
        }
        default:
            return state

    }
};

export const followAc = (userID:string) => ({type: FOLLOW, userID})
export const unFollowAc = (userID:string) => ({type: UNFOLLOW, userID})
export const setUsersAc = (users:Array<UsersType>) => ({type: SET_USERS, users})


export default UsersReducer;

