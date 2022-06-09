import {combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";


let reducers: any = combineReducers({
    profilePage:profileReducer,
    dialogsPage: dialogsReducer,
    sidebar:sidebarReducer,
    }
);


export let store = createStore(reducers);


