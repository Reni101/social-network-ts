import {combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: UsersReducer,
        auth: authReducer
    }
);
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;