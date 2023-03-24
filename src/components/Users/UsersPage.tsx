import React, { useCallback, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { followTC, getUsersTC, unfollowTC } from '../../Redux/users-reducer'
import { Paginator } from '../../common/Paginator/Paginator'
import {
	getFollowingInProgress,
	getUsers,
	getUsersCurrentPage,
	getUsersPageSize,
	getUsersTotalItemsCount
} from '../../selectors/users-selectors'
import { Preloader } from '../../common/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../Redux/redux-store'
import { getAuth } from '../../selectors/auth-selectors'
import { User } from './User/User'
import style from './Users.module.css'

import { friendType, Search } from './Search/Search'

export const UsersPage = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(getAuth)
	const users = useAppSelector(getUsers)
	const currentPageSize = useAppSelector(getUsersPageSize)
	const currentPage = useAppSelector(getUsersCurrentPage)
	const totalItemsCount = useAppSelector(getUsersTotalItemsCount)
	const followingInProgress = useAppSelector(getFollowingInProgress)

	const [searchParams, setSearchParams] = useSearchParams()

	const termQuery = searchParams.get('name') || ''
	const friendQuery = (searchParams.get('friend') || 'all') as friendType
	const friend = friendQuery === 'myFriend'

	const followHandler = (userId: number) => {
		dispatch(followTC({ userId }))
	}

	const unfollowHandler = (userId: number) => {
		dispatch(unfollowTC({ userId }))
	}

	const onPageChanged = useCallback(
		(pageNumber: number, pageSize: number) => {
			dispatch(
				getUsersTC({
					page: pageNumber,
					count: pageSize,
					term: termQuery,
					friend
				})
			)
		},
		[termQuery, friend, dispatch]
	)

	useEffect(() => {
		dispatch(
			getUsersTC({
				page: 1,
				count: currentPageSize,
				term: termQuery,
				friend
			})
		)
	}, [termQuery, friendQuery, dispatch, currentPageSize, friend])

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}
	if (!users.length) {
		return <Preloader />
	}
	return (
		<div className={style.container}>
			<h2>Users</h2>

			<Search
				friendQuery={friendQuery}
				termQuery={termQuery}
				setSearchParams={setSearchParams}
			/>

			<Paginator
				onPageChanged={onPageChanged}
				currentPageSize={currentPageSize}
				currentPage={currentPage}
				pageSize={currentPageSize}
				totalItemsCount={totalItemsCount}
			/>

			<div className={style.userContainer}>
				{users.map(el => (
					<User
						user={el}
						key={el.id}
						followingInProgress={followingInProgress}
						followThunk={followHandler}
						unfollowThunk={unfollowHandler}
					/>
				))}
				{!users.length && <div>users not found</div>}
			</div>
		</div>
	)
}
