import {combineReducers} from "redux";
import {DialogsReducer} from "./dialogs-reducer";
import {authReducer} from "./auth-reducer";
import thunk from 'redux-thunk';
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";
import {appReducer} from "./app-reducer";
import {chatWSReducer} from "./chat-ws-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: DialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer,
        chat: chatWSReducer,
    }
);


export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .prepend(thunk)

})


export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch



export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store;