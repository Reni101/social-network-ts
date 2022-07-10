import React from 'react';
import {connect} from "react-redux";
import {
    followAc,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAc, toggleIsFetchingAC,
    unFollowAc,
    UserType
} from "../../Redux/users-reducer";
import {RootStateType} from "../../Redux/Store";

import axios from "axios";
import UsersC from "./UsersC";
import Preloader from "../Preloader";

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
/*
type mapDispatchToPropsType = {
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void

}*/

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
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void

}

class UsersAPIComponent extends React.Component<UserPropsType, any> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)

            });
    }


    render() {


        return <>
            {this.props.isFetching ? <Preloader/> :
                <UsersC totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}

                />}

        </>
    }
}


let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}



export default connect(mapStateToProps, {
    follow: followAc,
    unFollow: unFollowAc,
    setUsers: setUsersAc,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC,
})(UsersAPIComponent);
