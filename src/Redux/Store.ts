
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

export type AddPostActionType = {
    type: "ADD-POST"
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
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


//window.store = store;