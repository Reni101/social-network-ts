import {authAPI, LoginType, ResponseType, ResultCodeEnum,} from "../api/api";
import {loginTC} from "../Redux/auth-reducer";


jest.mock("../api/api")
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

const result: ResponseType<LoginType> = {
    data: {
        userId: 22
    },
    messages: [],
    fieldsErrors: [],
    resultCode: ResultCodeEnum.Success,
}


authAPIMock.login.mockReturnValue(Promise.resolve(result))


test("loginTC", async () => {

    const thunk = loginTC("maximor-2008@tut.by", "12334", true)

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
})


afterEach(() => {
    jest.clearAllMocks()
});