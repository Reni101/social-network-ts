import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAc, toggleIsFetchingAC, unfollowThunkCreator,
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
    toggleIsFetching: (toggle: boolean) => void
    getUsersThunk: (currentPage: number, pageSize: number) => any
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void

}
type OwnPropsType = {}

class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
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
    setUsers: setUsersAc,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC,
    getUsersThunk: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator,

})(UsersContainer);
