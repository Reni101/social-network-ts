import {combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";


const reducers: any = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: UsersReducer,
    }
);


export const store = createStore(reducers);


