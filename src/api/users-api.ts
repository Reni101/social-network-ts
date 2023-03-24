import { UserType } from '../Redux/types'
import { instance, ResponseType } from './api'

export const usersAPI = {
	getUsers(params: usersQueryParams) {
		return instance
			.get<getUsersResponseType>('users', {
				params
			})
			.then(res => res.data)
	},
	followUser(userId: number) {
		return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
	},
	unfollowUser(userId: number) {
		return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
	}
}

export type getUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}

export type usersQueryParams = {
	page: number
	count: number
	term: string | null
	friend: null | boolean
}
