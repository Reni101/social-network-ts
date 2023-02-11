import {
	authAPI,
	AuthResType,
	LoginType,
	ResponseType,
	ResultCodeEnum
} from '../api/api'
import { getAuthUserDataTC, loginTC } from '../Redux/auth-reducer'

jest.mock('../api/api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

test('loginTC is working', async () => {
	const result: ResponseType<LoginType> = {
		data: {
			userId: 22
		},
		messages: [],
		fieldsErrors: [],
		resultCode: ResultCodeEnum.Success
	}
	authAPIMock.login.mockReturnValue(Promise.resolve(result))
	const thunk = loginTC('maximor-2008@tut.by', '12334', true)

	const dispatchMock = jest.fn()

	await thunk(dispatchMock)
	expect(dispatchMock).toBeCalledTimes(1)
})

test('getAuthUserDataTC', async () => {
	const result: ResponseType<AuthResType> = {
		data: {
			id: 123,
			login: '222',
			email: '3333'
		},
		messages: [],
		fieldsErrors: [],
		resultCode: ResultCodeEnum.Success
	}

	authAPIMock.getAuthMe.mockReturnValue(Promise.resolve(result))
	const thunk = getAuthUserDataTC()

	const dispatchMock = jest.fn()

	await thunk(dispatchMock)
	expect(dispatchMock).toBeCalledTimes(1)
})

afterEach(() => {
	jest.clearAllMocks()
})
