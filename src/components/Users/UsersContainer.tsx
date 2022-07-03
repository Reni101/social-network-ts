import React from 'react';
import {connect} from "react-redux";
import {followAc, setCurrentPageAC, setUsersAc, unFollowAc, UserType} from "../../Redux/users-reducer";
import {RootStateType} from "../../Redux/Store";
import { Dispatch } from 'redux';
import UsersC from "./UsersС";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize:number
    totalUsersCount:number
    currentPage:number
}

type mapDispatchToPropsType = {
    follow:(userID:string)=>void
    unFollow: (userID:string) => void
    setUsers: (users:Array<UserType>)=>void
    setCurrentPage:(pageNumber:number)=>void
}

let mapStateToProps = (state: RootStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage,
    }
}


let mapDispatchToProps = (dispatch:Dispatch):mapDispatchToPropsType => {
    return {
        follow: (userID:string) => {
            dispatch(followAc(userID))
        },
        unFollow: (userID:string) => {
            dispatch(unFollowAc(userID))
        },
        setUsers: (users:Array<UserType>)=> {
            dispatch(setUsersAc(users))
        },
        setCurrentPage:(pageNumber)=>{
            dispatch(setCurrentPageAC(pageNumber))
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);

export default UsersContainer;