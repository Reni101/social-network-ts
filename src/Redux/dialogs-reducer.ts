import {v1} from "uuid";
import {dialogs, messagesDialogs} from "./Types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "dialogsReducer",
    initialState: {
        messagesData: [
            {id: v1(), message: "Hi"},
            {id: v1(), message: "How are you?"},
            {id: v1(), message: "Privet"},
            {id: v1(), message: "Bye"},
            {id: v1(), message: "You are great"},
        ] as Array<messagesDialogs>,
        dialogsData: [
            {id: v1(), name: "Maxim"},
            {id: v1(), name: "Evgeny"},
            {id: v1(), name: "Andrey"},
            {id: v1(), name: "Sasha"},
            {id: v1(), name: "Denis"},
        ] as Array<dialogs>,
        newMessagesBody: ""
    },
    reducers: {
        sendMessageAC(state, action: PayloadAction<{ messageBody: string }>) {
            const newMessage = {
                id: v1(), message: action.payload.messageBody
            }
            state.messagesData = [...state.messagesData, newMessage]
        }
    }
})

export const dialogsReducer = slice.reducer
export const {sendMessageAC} = slice.actions
