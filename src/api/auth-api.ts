import { instance, ResponseType } from './api'

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

export const securityAPI = {
	getCaptcha() {
		return instance.get<{ url: string }>('security/get-captcha-url')
	}
}

export type AuthResType = {
	id: number
	login: string
	email: string
}

export type LoginType = {
	userId: number
}
