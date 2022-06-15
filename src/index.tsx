import React from 'react';
import {store} from "./Redux/Redux-store"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./Redux/Store"
import StoreContext from './StoreContext';

const rerenderEntireTree = (state: any) => { //fixed!

    ReactDOM.render(
        <StoreContext.Provider value={store}>
            <App />
        </StoreContext.Provider>
        , document.getElementById('root')
    )
    ;

}


rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state);
})

