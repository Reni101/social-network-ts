import {Redirect} from "react-router-dom";
import React from "react";
import {AppRootStateType} from "../Redux/Redux-store";
import {connect} from "react-redux";


export const WithAuthRedirect = (Component: any) => {

    type mapStateToPropsForRedirectType = {
        isAuth: boolean
    }

    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props} />
        }
    }

    let mapStateToPropsForRedirect = (state: AppRootStateType): mapStateToPropsForRedirectType => ({
        isAuth: state.auth.isAuth
    })
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent;
}

