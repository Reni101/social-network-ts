import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAc, setUsersAc, unFollowAc, UserType} from "../../Redux/users-reducer";
import {RootStateType} from "../../Redux/Store";
import { Dispatch } from 'redux';
import UsersC from "./UsersС";

type mapStateToPropsType = {
    users: Array<UserType>
}

type mapDispatchToPropsType = {
    follow:(userID:string)=>void
    unFollow: (userID:string) => void
    setUsers: (users:Array<UserType>)=>void
}

let mapStateToProps = (state: RootStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users
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
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);

export default UsersContainer;