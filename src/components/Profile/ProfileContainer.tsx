import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfileAC} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";



type PathParamsType = {
    userId: number,
}

type MapStateToPropsType = {
    profile:ProfileType | null
}

type MapDispatchToPropsType = {
    setUserProfile:(profile:ProfileType)=>void
}
//@ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType>{

    componentDidMount() {
        let userid = this.props.match.params.userId;
        if(!userid){
            userid = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userid)
            .then(response => {
                debugger
                this.props.setUserProfile(response.data)
            });
    }
    render() {
        return (
            <div>

                <Profile {...this.props} profile={ this.props.profile}/>
            </div>

        );
    }

}
let mapStateToProps =(state:AppRootStateType):MapStateToPropsType=>({
    profile:state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{
    setUserProfile:setUserProfileAC
})(WithUrlDataContainerComponent);