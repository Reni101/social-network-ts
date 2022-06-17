import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAc, setUsersAc, unFollowAc, UsersType} from "../../Redux/users-reducer";

let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
    }
}


let mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userID:string) => {
            dispatch(followAc(userID))
        },
        unFollow: (userID:string) => {
            dispatch(unFollowAc(userID))
        },
        setUsers: (users:Array<UsersType>)=> {
            dispatch(setUsersAc(users))
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;