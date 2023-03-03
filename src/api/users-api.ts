import { FilterType, UserType } from '../Redux/types'
import { instance, ResponseType } from './api'

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

export type getUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}
