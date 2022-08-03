import {Redirect} from "react-router-dom";
import React from "react";


export const WithAuthRedirect = (Component:any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return  <Component {...this.props} />
        }
    }
    return RedirectComponent;
}

