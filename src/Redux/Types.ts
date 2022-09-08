import {
    FollowActionType,
    SetCurrentPageActionType, SetTotalCountActionType,
    SetUsersActionType, ToggleIsFetchingActionType, ToggleIsFollowingActionType,
    UnfollowActionType,
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









