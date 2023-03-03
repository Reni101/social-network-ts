import React from 'react'

import { useAppSelector } from '../../Redux/redux-store'
import { ProfileType } from '../../Redux/types'

import { getProfile } from '../../selectors/profile-slectors'
import styleP from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

type ProfilePropsType = {
	isOwner: boolean
}

export const Profile = React.memo((props: ProfilePropsType) => {
	const profile = useAppSelector<ProfileType>(getProfile)

	return (
		<div className={styleP.profileContainer}>
			<ProfileInfo isOwner={props.isOwner} profile={profile} />
		</div>
	)
})
