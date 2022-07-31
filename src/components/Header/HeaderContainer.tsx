import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserDataAC} from "../../Redux/auth-reducer";
import {AppRootStateType} from "../../Redux/Redux-store";


type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchToPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}


class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            });
    }

    render() {
        return <Header {...this.props} />
    }

}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login!, // проверка на null
});


export default connect<MapStateToPropsType,
    MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    setAuthUserData: setAuthUserDataAC
})(HeaderContainer)