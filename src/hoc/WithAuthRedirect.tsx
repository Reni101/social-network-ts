import {Redirect} from "react-router-dom";
import React from "react";
import {AppRootStateType} from "../Redux/Redux-store";
import {connect} from "react-redux";


type mapPropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppRootStateType): mapPropsType => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    function RedirectComponent(props: WCP & mapPropsType) {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent {...restProps as WCP} />
    }


    let ConnectedRedirectComponent = connect<mapPropsType, {}, WCP,
        AppRootStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent;
}

