import React from 'react';
import {store} from "./Redux/Redux-store"
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import App2 from "./App2";
import {App} from "./App";



ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {/*<App/>*/}
            <App2/>
        </HashRouter>
    </Provider>
    , document.getElementById('root')
);





