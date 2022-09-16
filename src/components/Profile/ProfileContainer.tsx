import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    ProfileType,
    updateStatusThunkCreator
} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType | null
    status:string
    authorizedUserID:number

}

type MapDispatchToPropsType = {
    getProfileThunk: (userid: string) => void
    getStatusThunk: (status: string) => void
    updateStatusThunk: (status: string) => void
}

type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userid = this.props.match.params.userId;
        if (!userid) userid = this.props.authorizedUserID.toString() ;
        this.props.getProfileThunk(userid)
        this.props.getStatusThunk(userid)

    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile!}
                         status ={this.props.status}
                         updateStatus={this.props.updateStatusThunk}
                />
            </div>

        );
    }

}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID:state.auth.userId!,
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {},
        AppRootStateType>(mapStateToProps, {
        getProfileThunk: getProfileThunkCreator,
        getStatusThunk:getStatusThunkCreator,
        updateStatusThunk:updateStatusThunkCreator
    }),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer)

