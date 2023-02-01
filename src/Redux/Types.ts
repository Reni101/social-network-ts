import {ActionsUsersType} from "./users-reducer";
import {ActionsAuthType} from "./auth-reducer";
import {ActionsDialogsType} from "./dialogs-reducer";
import {
    ActionsProfileType


} from "./profile-reducer";
import {setInitializedType} from "./app-reducer";
import {ActionsChatType} from "./chat-ws-reducer";

export type ActionsTypes =
    | ActionsUsersType
    | ActionsAuthType
    | ActionsProfileType
    | ActionsDialogsType
    | setInitializedType
    | ActionsChatType


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









