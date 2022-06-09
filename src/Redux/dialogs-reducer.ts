import {v1} from "uuid";
import {ActionsTypes, DialogsPageType, SendMessageActionType, UpdateNewMessageBodyActionType} from "./Store";

const UPDATE_NEW_MESSAGES_BODY = "UPDATE-NEW-MESSAGES-BODY";
const SEND_MESSAGES = "SEND-MESSAGES";

let initialState = {
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
}


const DialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGES_BODY :
            state.newMessagesBody = action.body;
            return state;
        case SEND_MESSAGES :
            let body: string = state.newMessagesBody;
            state.messagesData.push({id: v1(), message: body})
            state.newMessagesBody = "";
            return state;
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