import {
    ActionsTypes,
    FollowActionType,
    Set_usersActionType,
    SetCurrentPageType,
    StateTypeUsers,
    UnfollowActionType
} from "./Store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'



let initialState: StateTypeUsers = {
    users: [       ],
    pageSize: 5,
    totalUsersCount:21,
    currentPage: 5,
}

export type UserType = {
    id: string,
    photoURL:string,
    followed: boolean,
    name: string,
    status: string,
    location: { city: string, country: string }
    photos:any
}


const UsersReducer = (state: StateTypeUsers = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case FOLLOW: {
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
        case SET_CURRENT_PAGE: {
            debugger
            return {...state,currentPage:action.currentPage}
        }
        default:
            return state

    }
};

export const followAc = (userID:string):FollowActionType => ({type: FOLLOW, userID})
export const unFollowAc = (userID:string):UnfollowActionType => ({type: UNFOLLOW, userID})
export const setUsersAc = (users:Array<UserType>):Set_usersActionType => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage:number):SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})


export default UsersReducer;

