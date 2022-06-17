import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

import UsersContainer from "./components/Users/UsersContainer";



type AppPropsType = {

}


const App = (props: AppPropsType) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">

                <Header/>
                <Navbar/>
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/dialogs" render={() => <DialogsContainer />}/>
                <Route path="/users" render={() => <UsersContainer/>}/>

            </div>
        </BrowserRouter>
    );
}


export default App;
