import React, { useCallback, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { followTC, getUsersTC, unfollowTC } from '../../Redux/users-reducer'
import { Paginator } from '../../common/Paginator/Paginator'

import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalItemsCount,
	getUsersSelector
} from '../../Redux/users-selectors'

import { Preloader } from '../../common/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../Redux/Redux-store'
import { User } from './User/User'
import style from './Users.module.css'

import { friendType, Search } from './Search/Search'

export const UsersPage = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const users = useAppSelector(getUsersSelector)
	const currentPageSize = useAppSelector(getPageSize)
	const currentPage = useAppSelector(getCurrentPage)
	const totalItemsCount = useAppSelector(getTotalItemsCount)
	const followingInProgress = useAppSelector(getFollowingInProgress)

	const [searchParams, setSearchParams] = useSearchParams()

	const termQuery = searchParams.get('name') || ''
	const friendQuery = (searchParams.get('friend') || 'all') as friendType

	const filter = {
		term: termQuery,
		friend: friendQuery === 'myFriend'
	}

	const followHandler = (userId: number) => {
		dispatch(followTC(userId))
	}

	const unfollowHandler = (userId: number) => {
		dispatch(unfollowTC(userId))
	}

	const onPageChanged = useCallback(
		(pageNumber: number, pageSize: number) => {
			dispatch(getUsersTC(pageNumber, pageSize, filter))
		},
		[filter, dispatch]
	)

	useEffect(() => {
		dispatch(getUsersTC(1, currentPageSize, filter))
	}, [termQuery, friendQuery])

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

export default UsersPage
