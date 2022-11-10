import {
    followActionType,
    setCurrentPageActionType, setTotalCountActionType,
    setUsersActionType, toggleIsFetchingActionType, toggleIsFollowingActionType,
    unfollowActionType,
} from "./users-reducer";
import {getCaptchaUrlACType, setUserDataActionType} from "./auth-reducer";
import {sendMessageActionType} from "./dialogs-reducer";
import {
    addPostActionType, savePhotoSuccessType,
    setStatusActionType,
    setUserProfileActionType,

} from "./profile-reducer";
import {setInitializedType} from "./app-reducer";

export type ActionsTypes =
    | addPostActionType
    | sendMessageActionType
    | followActionType
    | unfollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalCountActionType
    | toggleIsFetchingActionType
    | setUserProfileActionType
    | setUserDataActionType
    | toggleIsFollowingActionType
    | setStatusActionType
    | setInitializedType
    | savePhotoSuccessType
    | getCaptchaUrlACType


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









