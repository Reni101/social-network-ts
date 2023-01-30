import React from 'react';
import {connect} from "react-redux";
import {
    FilterType,
    followThunkCreator, getUsersThunkCreator,
    unfollowThunkCreator, UserType
} from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {AppRootStateType} from "../../Redux/Redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getTotalItemsCount,

    getUsersSelector
} from "../../Redux/users-selectors";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number, filter:FilterType) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void

}
type OwnPropsType = {}

class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, {term:"",friend:null})
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize,
            {term: this.props.filter.term,friend:this.props.filter.friend})
    }
    onFilterChanged = (filter: FilterType) => {
        this.props.getUsersThunk(1, this.props.pageSize, filter)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users totalItemsCount={this.props.totalItemsCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       followingInProgress={this.props.followingInProgress}
                       followThunk={this.props.followThunk}
                       unfollowThunk={this.props.unfollowThunk}
                       onFilterChanged={this.onFilterChanged}

                />}

        </>
    }
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state)
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType,
        OwnPropsType, AppRootStateType>(mapStateToProps, {
        getUsersThunk: getUsersThunkCreator,
        followThunk: followThunkCreator,
        unfollowThunk: unfollowThunkCreator,

    }),
    WithAuthRedirect
)(UsersContainer);

