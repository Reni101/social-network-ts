import React from 'react';
import state, {subscribe} from "./Redux/State"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, RootStateType, updateNewPostText} from "./Redux/State"

const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>,
        document.getElementById('root')
    );

}


rerenderEntireTree(state);

subscribe(rerenderEntireTree)

