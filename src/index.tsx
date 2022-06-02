import React from 'react';
import {store} from "./Redux/State"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./Redux/State"

const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={store.getState()} dispatch={store.dispatch.bind(store)} // bind привязывает контекст вызова!!

          /*   updateNewPostText={store.updateNewPostText.bind(store)}*/

        />,
        document.getElementById('root')
    );

}


rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree)

