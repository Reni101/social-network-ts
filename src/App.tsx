import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainerURL from "./components/Profile/ProfileContainer";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <Route path="/profile/:userId" render={() => <ProfileContainerURL/>}/>
                <Route path="/dialogs" render={() => <DialogsContainer />}/>
                <Route path="/users" render={() => <UsersContainer/>}/>
            </div>
        </BrowserRouter>
    );
}


export default App;
