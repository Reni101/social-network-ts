import {PhotosType} from "./profile-reducer";
import {ResponseType, ResultCodeEnum, usersAPI} from "../api/api";
import {AppThunk} from "./Redux-store";
import {Dispatch} from "redux";


export type initialUsersStateType = typeof initialState
export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string
    photos: PhotosType,
    followed: boolean,
    status: string,
}
export type FilterType = {
    term: string | null,
    friend: null | boolean
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {} as FilterType

}
export type ActionsUsersType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAc>
    | ReturnType<typeof setUsersAС>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingAC>
    | ReturnType<typeof setFilterAС>


export const UsersReducer = (state = initialState, action: ActionsUsersType): initialUsersStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ?
                    {...el, followed: true} : el)
            }
        }
        case "UNFOLLOW" : {
            return {
                ...state,
                users: state.users.map((el) => el.id === action.userID ?
                    {...el, followed: false} : el)
            }
        }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {

            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_COUNT": {

            return {...state, totalItemsCount: action.totalCount}
        }
        case "TOGGLE_IS_FETCHING": {

            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING": {

            return {
                ...state,
                followingInProgress: action.isFollowing
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        case "SET_TERM": {
            return {...state, filter: action.filter}
        }
        default:
            return state

    }
};

//========================Action Creator======================
export const followAC = (userID: number) => ({type: "FOLLOW", userID} as const)
export const unFollowAc = (userID: number) => ({type: "UNFOLLOW", userID} as const)
export const setUsersAС = (users: Array<UserType>) => ({type: "SET_USERS", users} as const)
export const setFilterAС = (filter: FilterType) => ({type: "SET_TERM", filter} as const)
export const setCurrentPageAC = (currentPage: number) => ({
    type: "SET_CURRENT_PAGE",
    currentPage
} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({
    type: "SET_TOTAL_COUNT",
    totalCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({
    type: "TOGGLE_IS_FETCHING",
    isFetching
} as const)
export const toggleIsFollowingAC = (isFollowing: boolean, userId: number) => ({
    type: "TOGGLE_IS_FOLLOWING",
    userId,
    isFollowing,
} as const)

//========================Thunk Creator======================
export const getUsersThunkCreator = (currentPage: number, pageSize: number,
                                     filter: FilterType): AppThunk => async dispatch => {
    dispatch(toggleIsFetchingAC(true));
    let res = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(setFilterAС(filter))
    dispatch(setCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAС(res.items))
    dispatch(setTotalUsersCountAC(res.totalCount))

}

export const followUnfollow = async (dispatch: Dispatch, userId: number,
                                     apiMethod: (userId: number) => Promise<ResponseType>,
                                     actionCreator: (userid: number) => ActionsUsersType) => {
    dispatch(toggleIsFollowingAC(true, userId))
    let res = await apiMethod(userId)
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleIsFollowingAC(false, userId))
}

export const followThunkCreator = (userId: number): AppThunk => async dispatch => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    let actionCreator = followAC
    await followUnfollow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollowThunkCreator = (userId: number): AppThunk => async dispatch => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    let actionCreator = unFollowAc
    await followUnfollow(dispatch, userId, apiMethod, actionCreator)

}




