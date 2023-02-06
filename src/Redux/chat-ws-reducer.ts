import {AppDispatch} from "./Redux-store";
import {Dispatch} from "redux";
import {chatAPI, StatusType} from "../api/chat-ws-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatMessageType} from "./Types";




const slice = createSlice({
    name: "chatWSReducer",
    initialState: {
        messages: [] as ChatMessageType[ ],
        status: 'pending' as StatusType
    },
    reducers: {
        setMessagesAC(state, action: PayloadAction<{ messages: ChatMessageType[] }>) {
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        },
        statusChangedAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        clearMessagesAC(state) {
            state.messages = []
        },
    }

})
export const chatWSReducer = slice.reducer
export const {setMessagesAC, statusChangedAC, clearMessagesAC} = slice.actions

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessagesAC({messages}))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChangedAC({status}))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListeningTC = () => async (dispatch: AppDispatch) => {

    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListeningTC = () => async (dispatch: AppDispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(clearMessagesAC())
}

export const sendMessage = (message: string) => {
    chatAPI.sendMessage(message)
}


