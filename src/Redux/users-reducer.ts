import {ActionsTypes} from "./Types";
import {PhotosType} from "./profile-reducer";
import {usersAPI} from "../api/api";

import {AppThunk} from "./Redux-store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'


export type initialStateType = typeof initialState


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>

}


export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string
    photos: PhotosType,
    followed: boolean,
    status: string,


}

export const UsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ? {...el, followed: true} : el)
            }
        }
        case UNFOLLOW : {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ? {...el, followed: false} : el)
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
        case TOGGLE_IS_FOLLOWING: {

            return {
                ...state,
                followingInProgress: action.isFollowing
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        default:
            return state

    }
};

//========================Action Creator======================
export type followActionType = {
    type: "FOLLOW"
    userID: number
}
export const followAc = (userID: number): followActionType => ({type: FOLLOW, userID})

export const unFollowAc = (userID: number): unfollowActionType => ({type: UNFOLLOW, userID})
export type unfollowActionType = {
    type: "UNFOLLOW"
    userID: number
}

export type setUsersActionType = {
    type: "SET-USERS"
    users: Array<UserType>
}
export const setUsersAС = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users})

export type setCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): setCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export type setTotalCountActionType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalCount: number
}
export const setTotalUsersCountAC = (totalCount: number): setTotalCountActionType => ({
    type: SET_TOTAL_COUNT,
    totalCount
})

export type toggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export type toggleIsFollowingActionType = {
    type: 'TOGGLE_IS_FOLLOWING'
    userId: number
    isFollowing: boolean
}
export const toggleIsFollowingAC = (isFollowing: boolean, userId: number): toggleIsFollowingActionType => ({
    type: TOGGLE_IS_FOLLOWING,
    userId,
    isFollowing,
})


//========================Thunk======================
export const getUsersThunkCreator = (currentPage: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(toggleIsFetchingAC(true));
    let res = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAС(res.items))
    dispatch(setTotalUsersCountAC(res.totalCount))

}
export const followThunkCreator = (userId: number): AppThunk => async dispatch => {
    dispatch(toggleIsFollowingAC(true, userId))
    let res = await usersAPI.followUser(userId)
    if (res.resultCode === 0) dispatch(followAc(userId));
    dispatch(toggleIsFollowingAC(false, userId))
}
export const unfollowThunkCreator = (userId: number): AppThunk => async dispatch => {
    dispatch(toggleIsFollowingAC(true, userId))
    let res = await usersAPI.unfollowUser(userId)
    if (res.resultCode === 0) dispatch(unFollowAc(userId));

}





