import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

import UserAvatar from '../../../assets/UsersAvatar.svg'

import { UserType } from '../../../Redux/types'

import style from './User.module.css'

type PropsType = {
	user: UserType
	followingInProgress: number[]
	followThunk: (userId: number) => void
	unfollowThunk: (userId: number) => void
}
export const User: FC<PropsType> = ({
	user,
	followingInProgress,
	followThunk,
	unfollowThunk
}) => {
	return (
		<div className={style.container}>
			<div>
				<NavLink to={'/profile/' + user.id}>
					<img
						src={user.photos.small !== null ? user.photos.small : UserAvatar}
						alt='imgAvatar'
						className={style.userAvatar}
					/>
				</NavLink>
			</div>
			<div>
				{user.followed ? (
					<Button
						type='primary'
						disabled={followingInProgress.some(id => id === user.id)}
						onClick={() => {
							unfollowThunk(user.id)
						}}
					>
						unFollow
					</Button>
				) : (
					<Button
						disabled={followingInProgress.some(id => id === user.id)}
						onClick={() => {
							followThunk(user.id)
						}}
					>
						Follow
					</Button>
				)}
			</div>
			{user.name}
			<div> status: {user.status !== null ? user.status : 'статус не найден'} </div>
		</div>
	)
}
