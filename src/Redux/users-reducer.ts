import {v1} from "uuid";
import {ActionsTypes, FollowActionType, Set_usersActionType, StateTypeUsers, UnfollowActionType} from "./Store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET USERS"



let initialState: StateTypeUsers = {
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


const UsersReducer = (state: StateTypeUsers = initialState, action: ActionsTypes) => {
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

export const followAc = (userID:string):FollowActionType => ({type: FOLLOW, userID})
export const unFollowAc = (userID:string):UnfollowActionType => ({type: UNFOLLOW, userID})
export const setUsersAc = (users:Array<UsersType>):Set_usersActionType => ({type: SET_USERS, users})


export default UsersReducer;

