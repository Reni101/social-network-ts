import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType} from "./Redux/State";


type AppPropsType ={
    state:RootStateType
    addPost:()=>void
    updateNewPostText:(newText:string)=>void
}

const App = (props:AppPropsType) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">

                <Header/>
                <Navbar/>
                <Route path="/profile" render={() => <Profile
                    state={props.state.profilePage}
                    addPost ={props.addPost}
                    updateNewPostText={props.updateNewPostText}
                                                              />}/>
                <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogsPage} />}/>
                {/*<Profile/>
            <Dialogs/>*/}
            </div>
        </BrowserRouter>
    );
}


export default App;
