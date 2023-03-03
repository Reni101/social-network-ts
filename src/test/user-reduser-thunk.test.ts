import { followTC, getUsersTC } from '../Redux/users-reducer'
import { ResponseType } from '../api/api'
import { getUsersResponseType, usersAPI } from '../api/users-api'

jest.mock('../api/users-api"')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

test('followThunkCreator', async () => {
	const result: ResponseType = {
		data: {},
		messages: [],
		fieldsErrors: [],
		resultCode: 0
	}
	userAPIMock.followUser.mockReturnValue(Promise.resolve(result))
	const thunk = followTC({ userId: 1 })

	const dispatchMock = jest.fn()
	const getStateMock = jest.fn()

	await thunk(dispatchMock, getStateMock, '')
	expect(dispatchMock).toBeCalledTimes(3)
})

test('getUsersThunkCreator working correct', async () => {
	const result: getUsersResponseType = {
		items: [
			{
				name: 'Maxim',
				id: 22,
				uniqueUrlName: null,
				photos: { small: null, large: null },
				followed: false,
				status: ''
			},
			{
				name: 'Maxim1',
				id: 23,
				uniqueUrlName: null,
				photos: { small: null, large: null },
				followed: false,
				status: ''
			}
		],
		totalCount: 2,
		error: null
	}

	userAPIMock.getUsers.mockReturnValue(Promise.resolve(result))

	const thunk = getUsersTC({
		currentPage: 1,
		pageSize: 5,
		filter: { term: '', friend: null }
	})

	const dispatchMock = jest.fn()
	const getStateMock = jest.fn()

	await thunk(dispatchMock, getStateMock, '')
	expect(dispatchMock).toBeCalledTimes(6)
})
