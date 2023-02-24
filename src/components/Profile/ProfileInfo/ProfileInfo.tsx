import React from 'react'
import { useSelector } from 'react-redux'

import UserAvatar from '../../../assets/UsersAvatar.jpg'
import { Preloader } from '../../common/Preloader/Preloader'
import { AppRootStateType } from '../../../Redux/Redux-store'
import { ProfileType } from '../../../Redux/Types'
import { UploadPhoto } from '../UploadPhoto/UploadPhoto'

import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import style from './ProfileInfo.module.css'

type PropsType = {
	profile: ProfileType
	isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({ profile, isOwner }) => {
	const statusFromState = useSelector<AppRootStateType, string>(
		state => state.profilePage.status
	)
	if (!profile) {
		return <Preloader />
	}
	return (
		<div className={style.infoContent}>
			<div className={style.avatar}>
				<img src={profile.photos.large || UserAvatar} alt='Avatar' />
				{isOwner && <UploadPhoto />}
			</div>

			<div className={style.description}>
				<span className={style.name}> {profile.fullName}</span>
				{isOwner ? (
					<ProfileStatus />
				) : (
					<div> status:{statusFromState || 'Status not found'} </div>
				)}
			</div>
		</div>
	)
})
