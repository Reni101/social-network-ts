import { authAPI, AuthResType, LoginType, ResponseType, ResultCodeEnum } from '../api/api'
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
	const thunk = loginTC({
		email: 'maximor-2008@tut.by',
		password: '12334',
		rememberMe: true
	})

	const dispatchMock = jest.fn()
	const getStateMock = jest.fn()

	await thunk(dispatchMock, getStateMock, '')
	expect(dispatchMock).toBeCalledTimes(3)
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
	const getStateMock = jest.fn()

	await thunk(dispatchMock, getStateMock, '')
	expect(dispatchMock).toBeCalledTimes(2)
})

afterEach(() => {
	jest.clearAllMocks()
})
