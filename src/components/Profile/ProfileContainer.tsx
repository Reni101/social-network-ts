import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    ProfileType, savePhotoTC,
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
    status: string
    authorizedUserID: number

}

type MapDispatchToPropsType = {
    getProfileThunk: (userid: string) => void
    getStatusThunk: (status: string) => void
    updateStatusThunk: (status: string) => void
    savePhotoThunk:any
}

type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.PureComponent<PropsType> {

    refreshProfile() {
        let userid = this.props.match.params.userId;
        if (!userid) userid = this.props.authorizedUserID.toString();
        this.props.getProfileThunk(userid)
        this.props.getStatusThunk(userid)
    }

    componentDidMount() {
        this.refreshProfile()

    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) this.refreshProfile()
    }


    render() {

        return (
            <div>
                <Profile {...this.props}
                         isOwner={(this.props.match.params.userId === this.props.authorizedUserID.toString()) || !this.props.match.params.userId }// вынести в отдельную
                         profile={this.props.profile!}
                         status={this.props.status}
                         updateStatus={this.props.updateStatusThunk}
                         savePhoto={this.props.savePhotoThunk}
                />
            </div>

        );
    }

}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userId!,
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {},
        AppRootStateType>(mapStateToProps, {
        getProfileThunk: getProfileThunkCreator,
        getStatusThunk: getStatusThunkCreator,
        updateStatusThunk: updateStatusThunkCreator,
        savePhotoThunk:savePhotoTC
    }),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer)

