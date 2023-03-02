import axios from 'axios'

import { FilterType, PhotosType, ProfileType, UserType } from '../Redux/types'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'fab19197-098e-4362-876a-0c0797e21ac6'
	}
})

export const usersAPI = {
	getUsers(currentPage: number = 1, pageSize: number = 10, filter: FilterType) {
		return instance
			.get<getUsersResponseType>(
				`users?page=${currentPage}&count=${pageSize}&term=${filter.term}&friend=${filter.friend}`
			)
			.then(res => res.data)
	},
	followUser(userId: number) {
		return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
	},
	unfollowUser(userId: number) {
		return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
	}
}

export const authAPI = {
	getAuthMe() {
		return instance.get<ResponseType<AuthResType>>('auth/me').then(res => res.data)
	},
	login(email: string, password: string, rememberMe: boolean, captcha?: string) {
		return instance
			.post<ResponseType<LoginType>>('auth/login', {
				email,
				password,
				rememberMe,
				captcha
			})
			.then(res => res.data)
	},
	logout() {
		return instance.delete<ResponseType>('auth/login').then(res => res.data)
	}
}

export const profileAPI = {
	getProfile(userid: string) {
		return instance.get<ProfileType>('profile/' + userid).then(res => res.data)
	},
	getStatus(userid: string) {
		return instance.get(`profile/status/${userid}`).then(res => res.data)
	},
	updateStatus(status: string) {
		return instance
			.put<ResponseType>('profile/status', { status })
			.then(res => res.data)
	},
	savePhoto(photoFile: File) {
		let formData = new FormData()
		formData.append('image', photoFile)
		return instance
			.put<ResponseType<{ photos: PhotosType }>>('profile/photo', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => res.data)
	}
}

export const securityAPI = {
	getCaptcha() {
		return instance.get<{ url: string }>('security/get-captcha-url')
	}
}

export const dialogsAPI = {
	getAllDialogs() {
		return instance.get<Array<usersDialogs>>('dialogs').then(res => res.data)
	},
	getMessagesFromUser(userId: number, page: number = 1) {
		return instance
			.get<ResponseMessagesUser>(`/dialogs/${userId}/messages?page=${page}`)
			.then(res => res.data)
	},
	sendMessage(userId: number, message: string) {
		return instance
			.post<ResponseType<{ message: MessageRes }>>(`dialogs/${userId}/messages`, {
				body: message
			})
			.then(res => res.data)
	}
}

export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10
}

export type getUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}

export type ResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: ResultCodeEnum
}

export type AuthResType = {
	id: number
	login: string
	email: string
}

export type LoginType = {
	userId: number
}

export type usersDialogs = {
	id: number
	userName: string
	hasNewMessages: boolean
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: PhotosType
}

export type MessageRes = {
	id: string
	body: string
	translatedBody: null | string
	addedAt: string
	senderId: number
	senderName: string
	recipientId: number
	viewed: boolean
	recipientName: string
	deletedBySender: boolean
	deletedByRecipient: boolean
	isSpam: boolean
	distributionId?: any
}
export type messageItems = {
	id: string
	body: string
	translatedBody: null | string
	addedAt: string
	senderId: number
	senderName: string
	recipientId: number
	viewed: boolean
}

export type ResponseMessagesUser = {
	items: messageItems[]
	totalCount: number
	error: null | string
}
