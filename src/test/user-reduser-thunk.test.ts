import {followThunkCreator, getUsersThunkCreator} from "../Redux/users-reducer";
import {getUsersResponseType, ResponseType, usersAPI} from "../api/api";


jest.mock("../api/api")

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


test("followThunkCreator", async () => {
    const result: ResponseType = {
        data: {},
        messages: [],
        fieldsErrors: [],
        resultCode: 0,
    }
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result))
    const thunk = followThunkCreator(1)

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)

})

test("getUsersThunkCreator working correct", async () => {
    const result: getUsersResponseType = {
        items: [
            {
                name: "Maxim",
                id: 22,
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: false,
                status: ""
            },
            {
                name: "Maxim1",
                id: 23,
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: false,
                status: ""
            }],
        totalCount: 2,
        error: null
    }


    userAPIMock.getUsers.mockReturnValue(Promise.resolve(result))
    const thunk = getUsersThunkCreator(1, 5, {term: "", friend: null})

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(6)

})



