import {ActionsTypes} from "./Types";
import {PhotosType} from "./profile-reducer";
import {usersAPI} from "../api/api";
import {Dispatch} from "react";

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
    followed: boolean,
    id: number,
    name: string,
    photos: PhotosType,
    status: string,
    photoURL: string,
    uniqueUrlName: null | string


}

const UsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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

export type ToggleIsFollowingActionType = {
    type: 'TOGGLE_IS_FOLLOWING'
    userId: number
    isFollowing: boolean
}
export const toggleIsFollowingAC = (isFollowing: boolean, userId: number): ToggleIsFollowingActionType => ({
    type: TOGGLE_IS_FOLLOWING,
    userId,
    isFollowing,
})





//========================Thunk======================
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {

    return (dispatch:Dispatch<ActionsTypes>) => {
        dispatch(toggleIsFetchingAC(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setCurrentPageAC(currentPage))
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAc(data.items))
                dispatch(setTotalUsersCountAC(data.totalCount))
            });
    }
}
export const followThunkCreator = (userId:number) => {
    return (dispatch:Dispatch<ActionsTypes>) => {
        dispatch(toggleIsFollowingAC(true, userId))
        usersAPI.followUser(userId)
            .then((data) => {
                if (data.resultCode === 0) dispatch(followAc(userId));
                dispatch(toggleIsFollowingAC(false, userId))
            })
    }
}
export const unfollowThunkCreator = (userId:number) => {
    return (dispatch:Dispatch<ActionsTypes>) => {
        dispatch(toggleIsFollowingAC(true, userId))
        usersAPI.unfollowUser(userId)
            .then((data) => {
                if (data.resultCode === 0) dispatch(unFollowAc(userId));
                dispatch(toggleIsFollowingAC(false, userId))
            })
    }
}


export default UsersReducer;

