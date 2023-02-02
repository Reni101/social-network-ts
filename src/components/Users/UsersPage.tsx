import React, { useEffect} from 'react';
import {FilterType, followTC, getUsersTC, unfollowTC} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import style from './Users.module.css'
import {SearchForm} from "./searchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize, getTotalItemsCount,
    getUsersSelector
} from "../../Redux/users-selectors";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";


const UsersPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const users = useSelector(getUsersSelector)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getFilter)


    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize,
            {term: filter.term, friend: filter.friend}))
    }
    const followHandler = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollowHandler = (userId: number) => {
        dispatch(unfollowTC(userId))
    }


    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, {term: "", friend: null}))
    }, [])


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.containerUsers}>
            <h2>Users</h2>

            <SearchForm
                onFilterChanged={onFilterChanged}
            />

            <Paginator onPageChanged={onPageChanged}
                       currentPage={currentPage}
                       pageSize={pageSize}
                       totalItemsCount={totalItemsCount}/>

            {users.map(el => <User user={el}
                                   key={el.id}
                                   followingInProgress={followingInProgress}
                                   followThunk={followHandler}
                                   unfollowThunk={unfollowHandler}
            />)}
        </div>
    );
};

export default UsersPage;
