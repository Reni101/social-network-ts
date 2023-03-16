import React from 'react'
import UserAvatar from '../../../assets/UsersAvatar.svg'
import { Preloader } from '../../../common/Preloader/Preloader'
import { ProfileType } from '../../../Redux/types'
import { UploadPhoto } from '../UploadPhoto/UploadPhoto'
import { StartDialog } from '../startDialog/StartDialog'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import style from './ProfileInfo.module.css'

type PropsType = {
	profile: ProfileType
	isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({ profile, isOwner }) => {
	if (!profile) {
		return <Preloader />
	}
	return (
		<div className={style.infoContent}>
			<div className={style.avatar}>
				<img src={profile.photos.large || UserAvatar} alt='Avatar' />
				{isOwner ? <UploadPhoto /> : <StartDialog userId={profile.userId} />}
			</div>

			<div className={style.description}>
				<span className={style.name}> {profile.fullName}</span>
				<ProfileStatus isOwner={isOwner} />
			</div>
		</div>
	)
})
