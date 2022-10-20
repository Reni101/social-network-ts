import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginPage";
import {connect} from "react-redux";

import {AppRootStateType} from "./Redux/Redux-store";
import {compose} from "redux";
import {InitializeAppTC} from "./Redux/app-reducer";

import Preloader from "./components/common/Preloader";

type MapDispatchToPropsType = {
    InitializeAppThunk: () => void
}
type MapStateToPropsType = {
    initialized: boolean

}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.InitializeAppThunk()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                <Route path="/users" render={() => <UsersContainer/>}/>
                <Route path="/login" render={() => <LoginPage/>}/>

            </div>

        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType,
        {}, AppRootStateType>(mapStateToProps, {
        InitializeAppThunk: InitializeAppTC
    })
)(App)



