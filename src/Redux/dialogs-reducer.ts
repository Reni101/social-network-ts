import {v1} from "uuid";
import {
    ActionsTypes,
} from "./Types";

const UPDATE_NEW_MESSAGES_BODY = "UPDATE-NEW-MESSAGES-BODY";
const SEND_MESSAGES = "SEND-MESSAGES";

export type messages = {
    id: string
    message: string
};
export type dialogs = {
    id: string
    name: string
};

export type InitialStateDialogsType = typeof initialState


let initialState = {
    messagesData: [
        {id: v1(), message: "Hi"},
        {id: v1(), message: "How are you?"},
        {id: v1(), message: "Privet"},
        {id: v1(), message: "Bye"},
        {id: v1(), message: "You are great"},
    ] as Array<messages>,
    dialogsData: [
        {id: v1(), name: "Maxim"},
        {id: v1(), name: "Evgeny"},
        {id: v1(), name: "Andrey"},
        {id: v1(), name: "Sasha"},
        {id: v1(), name: "Denis"},
    ] as Array<dialogs>,
    newMessagesBody: " ",
}


const DialogsReducer = (state: InitialStateDialogsType = initialState, action: ActionsTypes): InitialStateDialogsType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGES_BODY : {
            return {...state, newMessagesBody: action.newMessagesBody}
        }
        case SEND_MESSAGES : {
            let body: string = state.newMessagesBody;
            return {
                ...state,
                messagesData: [...state.messagesData, {id: v1(), message: body}],
                newMessagesBody: ""
            }
        }

        default:
            return state
    }
};

export type SendMessageActionType = {
    type: "SEND-MESSAGES"
}
export type UpdateNewMessageBodyActionType = {
    type: "UPDATE-NEW-MESSAGES-BODY";
    newMessagesBody: string
}

export const sendMessageActionCreator = (): SendMessageActionType => ({type: SEND_MESSAGES})
export const UpdateNewMessageBodyActionCreator = (body: string): UpdateNewMessageBodyActionType => ({
    type: UPDATE_NEW_MESSAGES_BODY,
    newMessagesBody: body,
})


export default DialogsReducer;