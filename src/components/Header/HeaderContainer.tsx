import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setUserDataAC} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {

            });
    }

    render() {
        return <Header {...this.props} />
    }

}
const mapStateToProps= (state:any)=>{

    return {}
}


export default connect(mapStateToProps,{setUserData:setUserDataAC})(HeaderContainer)