import React, {Suspense, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/Redux-store";
import {InitializeAppTC} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader";
import UsersPage from "./components/Users/UsersPage";

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
            <HeaderContainer/>
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

/*const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType,
        {}, AppRootStateType>(mapStateToProps, {
        InitializeAppThunk: InitializeAppTC
    })
)
(App)



*/
