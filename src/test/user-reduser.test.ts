import {followAC, initialUsersStateType, unFollowAC, usersReducer,} from "../Redux/users-reducer";


let state: initialUsersStateType;

beforeEach(() => {
    state = {
        users: [{
            id: 0,
            name: "Maxim",
            uniqueUrlName: null,
            photos: {small: null, large: null},
            followed: false,
            status: ""


        },
            {
                id: 1,
                name: "Dimych",
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: false,
                status: ""
            },
            {
                id: 2,
                name: "Nastia",
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: true,
                status: ""
            },
            {
                id: 3,
                name: "Masha",
                uniqueUrlName: null,
                photos: {small: null, large: null},
                followed: true,
                status: ""
            }],
        pageSize: 5,
        totalItemsCount: 1,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],

    }
})


test("follow success", () => {
    const newState = usersReducer(state, followAC({userID: 1}))
    expect(newState.users[0].followed).toBe(false)
    expect(newState.users[1].followed).toBe(true)

})
test("unfollow unFollowAc", () => {
    const newState = usersReducer(state, unFollowAC({userID: 2}))
    expect(newState.users[0].followed).toBe(false)
    expect(newState.users[2].followed).toBe(false)

})