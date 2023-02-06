import {ResponseType, ResultCodeEnum, usersAPI} from "../api/api";
import {AppDispatch} from "./Redux-store";
import {FilterType, UserType} from "./Types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "usersReducer",
    initialState: {
        users: [] as Array<UserType>,
        pageSize: 10,
        totalItemsCount: 1,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number>,
    },
    reducers: {
        followAC(state, action: PayloadAction<{ userID: number }>) {
            const index = state.users.findIndex(el => el.id === action.payload.userID)
            state.users[index] = {...state.users[index], followed: true}
        },
        unFollowAC(state, action: PayloadAction<{ userID: number }>) {
            const index = state.users.findIndex(el => el.id === action.payload.userID)
            state.users[index] = {...state.users[index], followed: false}
        },
        setUsersAС(state, action: PayloadAction<{ users: Array<UserType> }>) {
            state.users = action.payload.users
        },
        setCurrentPageAC(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },
        setCurrentPageSizeAC(state, action: PayloadAction<{ currentPageSize: number }>) {
            state.pageSize = action.payload.currentPageSize
        },
        setTotalUsersCountAC(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalItemsCount = action.payload.totalCount
        },
    }
})

export const usersReducer = slice.reducer
export const {
    followAC, unFollowAC, setUsersAС,
    setCurrentPageAC, setCurrentPageSizeAC,
    setTotalUsersCountAC,
} = slice.actions
export type initialUsersStateType = ReturnType<typeof slice.getInitialState>

//========================Thunk Creator======================
export const getUsersTC = (currentPage: number, pageSize: number,
                           filter: FilterType) => async (dispatch: AppDispatch) => {


    if (!filter.friend) filter.friend = null
    let res = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(setCurrentPageAC({currentPage}))
    dispatch(setCurrentPageSizeAC({currentPageSize: pageSize}))
    dispatch(setUsersAС({users: res.items}))
    dispatch(setTotalUsersCountAC({totalCount: res.totalCount}))


}

export const followUnfollow = async (dispatch: AppDispatch, userId: number,
                                     apiMethod: (userId: number) => Promise<ResponseType>,
                                     actionCreator: typeof followAC | typeof unFollowAC) => {
    let res = await apiMethod(userId)
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator({userID: userId}))
    }

}

export const followTC = (userId: number) => async (dispatch:AppDispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    await followUnfollow(dispatch, userId, apiMethod, followAC)
}

export const unfollowTC = (userId: number) => async (dispatch:AppDispatch) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    await followUnfollow(dispatch, userId, apiMethod, unFollowAC)

}


//         case "TOGGLE_IS_FOLLOWING": {
//
//             return {
//                 ...state,
//                 followingInProgress: action.isFollowing
//                     ? [...state.followingInProgress, action.userId]
//                     : [...state.followingInProgress.filter(id => id !== action.userId)]
//             }
//         }
// export const toggleIsFollowingAC = (isFollowing: boolean, userId: number) => ({
//     type: "TOGGLE_IS_FOLLOWING",
//     userId,
//     isFollowing,
// } as const)
//