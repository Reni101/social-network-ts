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


test("loginTC", async () => {
    authAPIMock.login.mockReturnValue(Promise.resolve(result))
    const thunk = loginTC("maximor-2008@tut.by", "12334", true)

    const dispatchMock = jest.fn()

    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(1)
})


afterEach(() => {
    jest.clearAllMocks()
});