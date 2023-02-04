import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfileTC, getStatusTC} from "../../Redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../Redux/Redux-store";

export const ProfileContainer = () => {
    let {userId} = useParams()
    const dispatch = useDispatch()

    const authorizedUserID = useSelector<AppRootStateType, number>(state => state.auth.userId!)
    const isOwner = +userId! === authorizedUserID
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getProfileTC(userId ? userId : authorizedUserID.toString()))
        dispatch(getStatusTC(userId ? userId : authorizedUserID.toString()))
    }, [userId])


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Profile
                isOwner={isOwner}
            />
        </div>
    );
};


