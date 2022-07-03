import React from 'react';
import {connect} from "react-redux";
import {
    followAc,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAc,
    unFollowAc,
    UserType
} from "../../Redux/users-reducer";
import {RootStateType} from "../../Redux/Store";
import { Dispatch } from 'redux';

import axios from "axios";
import UsersC from "./UsersC";

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
    setTotalUsersCount:(totalCount:number)=>void
}

type UserPropsType = {
    users: Array<UserType>
    follow: (id: string) => void
    unFollow: (id: string) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class UsersAPIComponent extends React.Component<UserPropsType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }


    render() {


        return <UsersC totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
        />
    }
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
        },
        setTotalUsersCount:(totalCount)=>{
            dispatch(setTotalUsersCountAC(totalCount))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
