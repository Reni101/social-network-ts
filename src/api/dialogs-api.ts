import { PhotosType } from '../Redux/types'
import { instance, ResponseType } from './api'

export const dialogsAPI = {
	startDialogs(userId: number) {
		return instance.put<ResponseType>(`dialogs/${userId}`).then(res => res.data)
	},

	getAllDialogs() {
		return instance.get<ResUsersDialogs[]>('dialogs').then(res => res.data)
	},
	getMessagesFromUser(userId: number, page: number = 1) {
		return instance
			.get<ResMessagesUser>(`/dialogs/${userId}/messages?page=${page}`)
			.then(res => res.data)
	},
	sendMessage(userId: number, message: string) {
		return instance
			.post<ResponseType<{ message: addMessageRes }>>(
				`dialogs/${userId}/messages`,
				{
					body: message
				}
			)
			.then(res => res.data)
	}
}
export type ResUsersDialogs = {
	id: number
	userName: string
	hasNewMessages: boolean
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: PhotosType
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
export type addMessageRes = messageItems & {
	recipientName: string
	deletedBySender: boolean
	deletedByRecipient: boolean
	isSpam: boolean
	distributionId?: any
}

export type ResMessagesUser = {
	items: messageItems[]
	totalCount: number
	error: null | string
}
