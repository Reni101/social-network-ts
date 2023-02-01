import {AppThunk} from "./Redux-store";
import {Dispatch} from "redux";
import {chatAPI, StatusType} from "../api/chat-ws-api";

export type initialStateType = typeof initialState

export type ActionsChatType =
    | ReturnType<typeof setMessagesAC>
    | ReturnType<typeof statusChangedAC>
    | ReturnType<typeof clearMessagesAC>

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const initialState = {
    messages: [] as ChatMessageType[ ],
    status: 'pending' as StatusType
};

export const chatWSReducer = (state = initialState, action: ActionsChatType): initialStateType => {
    switch (action.type) {
        case "CHAT/SET_MESSAGES":
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        case "CHAT/STATUS_CHANGED":
            return {...state, status: action.payload.status}
        case "CHAT/CLEAR_MESSAGES":
            return {...state, messages: []}
        default:
            return state
    }
}

//========================Action Creator======================

export const setMessagesAC = (messages: ChatMessageType[]) => ({
    type: 'CHAT/SET_MESSAGES',
    payload: {messages}
} as const)
export const statusChangedAC = (status: StatusType) => ({
    type: 'CHAT/STATUS_CHANGED',
    payload: {status}
} as const)
export const clearMessagesAC = () => ({
    type: 'CHAT/CLEAR_MESSAGES',
} as const)


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessagesAC(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChangedAC(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListeningTC = (): AppThunk => async (dispatch) => {

    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListeningTC = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(clearMessagesAC())
}

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatAPI.sendMessage(message)
}


