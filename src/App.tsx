import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {ActionsTypes, RootStateType, StoreType} from "./Redux/Store";


type AppPropsType = {
    state: any //fixed!
    /*addPost:()=>void
    updateNewPostText:(newText:string)=>void*/
    dispatch: (action: ActionsTypes) => void
    store:any //fixed!
}

const App = (props: AppPropsType) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">

                <Header/>
                <Navbar/>
                <Route path="/profile" render={() => <Profile
                    store={props.store}


                />}/>
                <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogsPage}
                                                              store ={props.store}


                />}/>

            </div>
        </BrowserRouter>
    );
}


export default App;
