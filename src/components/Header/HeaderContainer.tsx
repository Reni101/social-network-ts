import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataTC, logoutTC} from "../../Redux/auth-reducer";
import {AppRootStateType} from "../../Redux/Redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchToPropsType = {
    getAuthUserDataThunk: () => void
    logout: () => void
}


class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.getAuthUserDataThunk()
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
    getAuthUserDataThunk: getAuthUserDataTC,
    logout: logoutTC
})(HeaderContainer)