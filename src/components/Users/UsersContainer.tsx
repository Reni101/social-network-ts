import React from 'react';
import {connect} from "react-redux";
import {
    followAc, followThunkCreator, getUsersThunkCreator,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAc, toggleIsFetchingAC, toggleIsFollowingAC,
    unFollowAc, unfollowThunkCreator,
    UserType
} from "../../Redux/users-reducer";
import UsersC from "./UsersC";
import Preloader from "../Preloader";
import {AppRootStateType} from "../../Redux/Redux-store";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchToPropsType = {
    setUsers: (items: Array<UserType>) => void
    setTotalUsersCount: (totalCount: number) => void
    setCurrentPage: (pageNumber: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    toggleIsFetching: (toggle: boolean) => void
    toggleIsFollow: (isFollow: boolean, userId: number) => void
    getUsersThunk: (currentPage: number, pageSize: number) => any
    followThunk: (userId: number) => any
    unfollowThunk: (userId: number) => any

}
type OwnPropsType = {}

/*type PropsType = {

    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number

    toggleIsFetching: (toggle: boolean) => void
    setUsers: (items: Array<UserType>) => void
    setTotalUsersCount: (totalCount: number) => void
    setCurrentPage: (pageNumber: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
}*/


class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {

        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        /*       this.props.toggleIsFetching(true)
               this.props.setCurrentPage(pageNumber)
               usersAPI.getUsers(pageNumber, this.props.pageSize)
                   .then(data => {
                       this.props.toggleIsFetching(false)
                       this.props.setUsers(data.items)
                   });*/

        this.props.getUsersThunk(pageNumber, this.props.pageSize)
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
                        toggleIsFollow={this.props.toggleIsFollow}
                        followingInProgress={this.props.followingInProgress}
                        followThunk={this.props.followThunk}
                        unfollowThunk={this.props.unfollowThunk}

                />}

        </>
    }
}


let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,//всего страниц?
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

export default connect<MapStateToPropsType, MapDispatchToPropsType,
    OwnPropsType, AppRootStateType>(mapStateToProps, {
    follow: followAc,
    unFollow: unFollowAc,
    setUsers: setUsersAc,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC,
    toggleIsFollow: toggleIsFollowingAC,
    getUsersThunk: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator,

})(UsersContainer);
