import {applyMiddleware, combineReducers, createStore} from "redux";
import {DialogsReducer} from "./dialogs-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {ActionsTypes} from "./Types";
import {ProfileReducer} from "./profile-reducer";
import {UsersReducer} from "./users-reducer";
import {appReducer} from "./app-reducer";
import {chatWSReducer} from "./chat-ws-reducer";


const rootReducer = combineReducers({
        profilePage: ProfileReducer,
        dialogsPage: DialogsReducer,
        usersPage: UsersReducer,
        auth: authReducer,
        app: appReducer,
        chat: chatWSReducer,
    }
);


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void > = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsTypes>


//@ts-ignore
window.store = store;