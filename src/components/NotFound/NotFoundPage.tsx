import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";

export const NotFoundPage = () => {
    const userId = useSelector<AppRootStateType>(state => state.profilePage.profile)
    const navigate = useNavigate()

    const backHandler = () => {
        navigate(`/profile/${userId}`)
    }
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={backHandler}>Back</Button>}
            />
        </div>
    );
};
