import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'fab19197-098e-4362-876a-0c0797e21ac6'
	}
})

export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10
}

export type ResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: ResultCodeEnum
}
