import React, {FC} from 'react';
import {FilterType, UserType} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import style from './Users.module.css'
import {SearchForm} from "./searchForm/SearchForm";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalItemsCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: FC<PropsType> = (props) => {

    return (
        <div className={style.containerUsers}>
            <h2>Users</h2>

            <SearchForm
                onFilterChanged={props.onFilterChanged}
            />

            <Paginator onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage}
                       pageSize={props.pageSize}
                       totalItemsCount={props.totalItemsCount}/>

            {props.users.map(el => <User user={el}
                                         key={el.id}
                                         followingInProgress={props.followingInProgress}
                                         followThunk={props.followThunk}
                                         unfollowThunk={props.unfollowThunk}/>)}
        </div>
    );
};

export default Users;
