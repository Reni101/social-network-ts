import {followThunkCreator} from "../Redux/users-reducer";
import {ResponseType, usersAPI} from "../api/api";


jest.mock("../api/api")

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    data: {},
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result))


test("followThunkCreator", async () => {

    const thunk = followThunkCreator(1)

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)

})



