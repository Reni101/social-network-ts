import {ActionsTypes} from "./Types";
import {PhotosType} from "./profile-reducer";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


export type initialStateType = typeof initialState


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: false
}


export type UserType = {
    id: number,
    photoURL: string,
    followed: boolean,
    name: string,
    status: string,
    location?: { city: string, country: string }
    photos: PhotosType
}


const UsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {

            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {

            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {

            return {...state, isFetching: action.isFetching}
        }
        default:
            return state

    }
};
export type FollowActionType = {
    type: "FOLLOW"
    userID: number
}
export const followAc = (userID: number): FollowActionType => ({type: FOLLOW, userID})

export const unFollowAc = (userID: number): UnfollowActionType => ({type: UNFOLLOW, userID})
export type UnfollowActionType = {
    type: "UNFOLLOW"
    userID: number
}

export type SetUsersActionType = {
    type: "SET-USERS"
    users: Array<UserType>
}
export const setUsersAc = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

export type SetCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export type SetTotalCountActionType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalCount: number
}
export const setTotalUsersCountAC = (totalCount: number): SetTotalCountActionType => ({
    type: SET_TOTAL_COUNT,
    totalCount
})

export type ToggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})


export default UsersReducer;

