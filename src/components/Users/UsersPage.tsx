import React, {useCallback, useEffect} from 'react';
import {followTC, getUsersTC, unfollowTC} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import style from './Users.module.css'
import {SearchForm} from "./searchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,

    getFollowingInProgress,
    getPageSize, getTotalItemsCount,
    getUsersSelector
} from "../../Redux/users-selectors";
import {Navigate, useSearchParams} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";


const UsersPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const users = useSelector(getUsersSelector)
    const currentPageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const followingInProgress = useSelector(getFollowingInProgress)


    const [searchParams, setSearchParams] = useSearchParams();

    const termQuery = searchParams.get('name') || ''
    const friendQuery = searchParams.get('friend') || ''
    const filter = {
        term: termQuery,
        friend: (friendQuery === 'myFriend')
    }

    const followHandler = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollowHandler = (userId: number) => {
        dispatch(unfollowTC(userId))
    }


    const onPageChanged = useCallback((pageNumber: number, pageSize: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }, [filter])

    useEffect(() => {
        dispatch(getUsersTC(1, currentPageSize, filter))
    }, [termQuery, friendQuery])


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.containerUsers}>
            <h2>Users</h2>

            <SearchForm

                friendQuery={friendQuery}
                termQuery={termQuery}
                setSearchParams={setSearchParams}

            />

            <Paginator onPageChanged={onPageChanged}
                       currentPageSize={currentPageSize}
                       currentPage={currentPage}
                       pageSize={currentPageSize}
                       totalItemsCount={totalItemsCount}/>

            {users.map(el => <User user={el}
                                   key={el.id}
                                   followingInProgress={followingInProgress}
                                   followThunk={followHandler}
                                   unfollowThunk={unfollowHandler}
            />)}
            {!users.length && <div>not found</div>}
        </div>
    );
};

export default UsersPage;
