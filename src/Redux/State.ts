import {v1} from "uuid";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";



export type StoreType = {
    _state: RootStateType

    getState: () => RootStateType
    _callSubscriber: (a: RootStateType) => void
    /* _addPost: () => void
     _updateNewPostText: (newText: string) => void*/
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
    //newPostText?: string
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

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [

                {id: v1(), message: "My first post", likeCount: 0},
            ],
            newPostText: "",

        },
        dialogsPage: {
            messagesData: [
                {id: v1(), message: "Hi"},
                {id: v1(), message: "How are you?"},
                {id: v1(), message: "Privet"},
                {id: v1(), message: "Bye"},
                {id: v1(), message: "You are great"},],
            dialogsData: [
                {id: v1(), name: "Maxim"},
                {id: v1(), name: "Evgeny"},
                {id: v1(), name: "Andrey"},
                {id: v1(), name: "Sasha"},
                {id: v1(), name: "Denis"},],
            newMessagesBody: " ",
        },
        sidebar: {}

    },
    _callSubscriber(a: RootStateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(action) // надо допилить
        this._callSubscriber(this._state);
    },

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