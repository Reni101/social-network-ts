import React, {Suspense, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {LoginPage} from "./components/Login/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/Redux-store";
import {InitializeAppTC} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader";
import UsersPage from "./components/Users/UsersPage";
import {HeaderPage} from "./components/Header/HeaderPage";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


export const App = () => {
    const dispathc = useDispatch()
    const initialized = useSelector<AppRootStateType>(state => state.app.initialized)

    useEffect(() => {
        dispathc(InitializeAppTC())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="app-wrapper">
            <HeaderPage/>
            <Navbar/>
            <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
            <Route path="/dialogs"
                   render={() => {
                       return <Suspense fallback={<div>Loading...</div>}> <DialogsContainer/> </Suspense>
                   }}/>
            <Route path="/users" render={() => <UsersPage/>}/>
            <Route path="/login" render={() => <LoginPage/>}/>
        </div>

    )

};

