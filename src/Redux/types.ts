export type ProfileType = {
	aboutMe: null | string
	contacts: ContactsType
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	photos: PhotosType
	userId: number
}
export type ContactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}
export type PhotosType = {
	small: string | null | undefined
	large: string | null | undefined
}

export type UserType = {
	name: string
	id: number
	uniqueUrlName: null | string
	photos: PhotosType
	followed: boolean
	status: string
}
export type FilterType = {
	term: string | null
	friend: null | boolean
}

export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}
