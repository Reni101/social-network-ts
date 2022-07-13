import {v1} from "uuid";
import {
    ActionsTypes,
    SendMessageActionType,
    UpdateNewMessageBodyActionType
} from "./Store";

const UPDATE_NEW_MESSAGES_BODY = "UPDATE-NEW-MESSAGES-BODY";
const SEND_MESSAGES = "SEND-MESSAGES";
type messages = {
    id: string
    message: string
};
type dialogs = {
    id: string
    name: string
};
type InitialStateType = typeof initialState


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


const DialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGES_BODY : {
            return {...state, newMessagesBody: action.body}
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

export const sendMessageCreator = (): SendMessageActionType => ({type: SEND_MESSAGES})
export const UpdateNewMessageBodyCreator = (body: string): UpdateNewMessageBodyActionType => ({
    type: UPDATE_NEW_MESSAGES_BODY,
    body: body,
})


export default DialogsReducer;