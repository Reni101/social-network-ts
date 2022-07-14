import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../Redux/profile-reducer";
import {RootStateType} from "../../Redux/Types";
import {withRouter} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";

class ProfileContainer extends React.Component<any, any>{

    componentDidMount() {
        let userid = this.props.match.params.userId;
        if(!userid){
            userid = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userid)
            .then(response => {
                // @ts-ignore
                this.setUserProfile(response.data)
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
let mapStateToProps =(state:AppRootStateType)=>({
    profile:state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{
    setUserProfile:setUserProfileAC
})(WithUrlDataContainerComponent);