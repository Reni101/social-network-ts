import {v1} from "uuid";

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
export type ActionsDialogsType = |ReturnType<typeof sendMessageActionCreator>

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
}


export const DialogsReducer = (state: InitialStateDialogsType = initialState, action: ActionsDialogsType): InitialStateDialogsType => {
    switch (action.type) {
        case SEND_MESSAGES : {
            let body: string = action.messageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, {id: v1(), message: body}],
            }
        }
        default:
            return state
    }
};


export const sendMessageActionCreator = (messageBody: string) => ({type: SEND_MESSAGES, messageBody} as const)



