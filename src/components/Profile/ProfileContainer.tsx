import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, ProfileType} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    getProfileThunk: (userid: string) => void
}

type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userid = this.props.match.params.userId;
        if (!userid) userid = '24522';

        this.props.getProfileThunk(userid)
    }

    render() {


        return (
            <div>
                <Profile {...this.props} profile={this.props.profile!}/>
            </div>

        );
    }

}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default WithAuthRedirect( connect<MapStateToPropsType, MapDispatchToPropsType, {},
    AppRootStateType>(mapStateToProps, {
    getProfileThunk: getProfileThunkCreator,
})(WithUrlDataContainerComponent));