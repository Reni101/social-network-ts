import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataThunkCreator} from "../../Redux/auth-reducer";
import {AppRootStateType} from "../../Redux/Redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchToPropsType = {
    getAuthUserDataThunk: () => void
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
    getAuthUserDataThunk: getAuthUserDataThunkCreator
})(HeaderContainer)