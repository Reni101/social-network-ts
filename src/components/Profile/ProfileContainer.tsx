import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../Redux/profile-reducer";
import {RootStateType} from "../../Redux/Store";

class ProfileContainer extends React.Component<any, any>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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
let mapStateToProps =(state:RootStateType)=>({
    profile:state.profilePage.profile
})

export default connect(mapStateToProps,{
    setUserProfile:setUserProfileAC
})(ProfileContainer);