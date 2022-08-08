import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppRootStateType} from "../Redux/Redux-store";
import {connect} from "react-redux";


type mapPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): mapPropsType => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<T>(Component: ComponentType<T>) {

    function RedirectComponent(props: mapPropsType) {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T} />
    }


    return connect(mapStateToProps)(RedirectComponent);
}

