import axios from 'axios'
import { ResultCodeEnum } from '../Enums/ResultCode'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'fab19197-098e-4362-876a-0c0797e21ac6'
	}
})

export type ResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: ResultCodeEnum
}
