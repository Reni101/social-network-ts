import {FollowActionType, UnfollowActionType, UserType} from "./users-reducer";
import {setUserDataActionType} from "./auth-reducer";
import {SendMessageActionType, UpdateNewMessageBodyActionType} from "./dialogs-reducer";
import {AddPostActionType, setUserProfileActionType, UpdateNewPostTextPostActionType} from "./profile-reducer";

export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | UpdateNewPostTextPostActionType
    | UpdateNewMessageBodyActionType
    | FollowActionType
    | UnfollowActionType
    | Set_usersActionType
    | SetCurrentPageType
    | SetTotalCount
    | ToggleIsFetching
    | setUserProfileActionType
    | setUserDataActionType




export type Set_usersActionType = {
    type: "SET-USERS"
    users: Array<UserType>
}
export type SetCurrentPageType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}
export type SetTotalCount = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalCount: number
}
export type ToggleIsFetching = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}


export type ProfilePageType = {
    postsData: Array<PostsType>
    newPostText: string
    profile: any
}


export type PostsType = {
    id: string
    message: string
    likeCount: number
};
export type messages = {
    id: string
    message: string
};
export type dialogs = {
    id: string
    name: string
};


export type DialogsPageType = {
    messagesData: Array<messages>
    dialogsData: Array<dialogs>
    newMessagesBody: string
}
export type SidebarType = {}

export type StateTypeUsers = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
    usersPage: StateTypeUsers
    isFetching: boolean


}


//window.store = store;