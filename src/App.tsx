import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";



type AppPropsType = {

}


const App = (props: AppPropsType) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">

                <HeaderContainer/>
                <Navbar/>
                <Route path="/profile/:userId" render={() => <ProfileContainer/>}/>
                <Route path="/dialogs" render={() => <DialogsContainer />}/>
                <Route path="/users" render={() => <UsersContainer/>}/>

            </div>
        </BrowserRouter>
    );
}


export default App;
