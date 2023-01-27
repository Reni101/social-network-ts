import {PhotosType} from "./profile-reducer";
import {ResulCode, usersAPI} from "../api/api";

import {AppThunk} from "./Redux-store";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'


export type initialStateType = typeof initialState
export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string
    photos: PhotosType,
    followed: boolean,
    status: string,
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalItemsCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>

}
export type ActionsUsersType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAc>
    | ReturnType<typeof setUsersAС>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingAC>



export const UsersReducer = (state = initialState, action: ActionsUsersType): initialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ?
                    {...el, followed: true} : el)
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

            return {...state, totalItemsCount: action.totalCount}
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
export const followAC = (userID: number) => ({type: FOLLOW, userID} as const)
export const unFollowAc = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const setUsersAС = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({
    type: SET_TOTAL_COUNT,
    totalCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
} as const)
export const toggleIsFollowingAC = (isFollowing: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING,
    userId,
    isFollowing,
} as const)

//========================Thunk Creator======================
export const getUsersThunkCreator = (currentPage: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(toggleIsFetchingAC(true));
    let res = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAС(res.items))
    dispatch(setTotalUsersCountAC(res.totalCount))

}

export const followUnfollow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingAC(true, userId))
    let res = await apiMethod(userId)
    if (res.resultCode === ResulCode.Success) dispatch(actionCreator(userId));
    dispatch(toggleIsFollowingAC(false, userId))
}

export const followThunkCreator = (userId: number): AppThunk => async dispatch => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    let actionCreator = followAC
    followUnfollow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollowThunkCreator = (userId: number): AppThunk => async dispatch => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    let actionCreator = unFollowAc
    followUnfollow(dispatch, userId, apiMethod, actionCreator)

}




