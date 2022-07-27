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
import UsersC from "./UsersC";
import Preloader from "../Preloader";
import {getUsers} from "../../api/api";
import {AppRootStateType} from "../../Redux/Redux-store";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type MapDispatchToPropsType = {
    setUsers: (items: Array<UserType>) => void
    setTotalUsersCount: (totalCount: number) => void
    setCurrentPage: (pageNumber: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    toggleIsFetching: (toggle: boolean) => void
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
        this.props.toggleIsFetching(true);

        getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
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


let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,//всего страниц?
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
})(UsersContainer);
