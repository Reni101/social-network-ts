import { PhotosType, ProfileType } from '../Redux/types'
import { instance, ResponseType } from './api'

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
