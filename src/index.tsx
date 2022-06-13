import React from 'react';
import {store} from "./Redux/Redux-store"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./Redux/Store"

const rerenderEntireTree = (state: any) => { //fixed!

    ReactDOM.render(
        <App state={store.getState()} dispatch={store.dispatch.bind(store)}
            store={store}

            // bind привязывает контекст вызова!!

        />,
        document.getElementById('root')
    );

}


rerenderEntireTree(store.getState());

store.subscribe(()=> {
    let state = store.getState()
    rerenderEntireTree(state);
})

