import {
    FollowActionType,
    SetCurrentPageActionType, SetTotalCountActionType,
    SetUsersActionType, ToggleIsFetchingActionType, ToggleIsFollowingActionType,
    UnfollowActionType,
    UserType
} from "./users-reducer";
import {setUserDataActionType} from "./auth-reducer";
import {SendMessageActionType} from "./dialogs-reducer";
import {
    AddPostActionType,
    setStatusActionType,
    setUserProfileActionType,

} from "./profile-reducer";

export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalCountActionType
    | ToggleIsFetchingActionType
    | setUserProfileActionType
    | setUserDataActionType
    | ToggleIsFollowingActionType
    | setStatusActionType


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


