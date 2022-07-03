import {UserType} from "./users-reducer";

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (a: RootStateType) => void
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | UpdateNewPostTextPostActionType
    | UpdateNewMessageBodyActionType
    | FollowActionType
    | UnfollowActionType
    | Set_usersActionType

export type FollowActionType = {
    type: "FOLLOW"
    userID: string
}
export type UnfollowActionType = {
    type: "UNFOLLOW"
    userID: string
}
export type Set_usersActionType = {
    type: "SET USERS"
    users: Array<UserType>
}

export type AddPostActionType = {
    type: "ADD-POST",


}
export type UpdateNewPostTextPostActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
export type SendMessageActionType = {
    type: "SEND-MESSAGES"
}
export type UpdateNewMessageBodyActionType = {
    type: "UPDATE-NEW-MESSAGES-BODY";
    body: string
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
export type ProfilePageType = {
    postsData: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    messagesData: Array<messages>
    dialogsData: Array<dialogs>
    newMessagesBody: string
}
export type SidebarType = {}

export type StateTypeUsers = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount:number
    currentPage:number
}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
    usersPage:StateTypeUsers


}


//window.store = store;