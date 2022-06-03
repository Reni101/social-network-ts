import {v1} from "uuid";
import {SendMessageActionType, UpdateNewMessageBodyActionType} from "./State";

const UPDATE_NEW_MESSAGES_BODY = "UPDATE-NEW-MESSAGES-BODY";
const SEND_MESSAGES = "SEND-MESSAGES";


const DialogsReducer = (state: any, action: any) => {
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