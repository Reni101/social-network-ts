import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateStatusTC} from "../../../../Redux/profile-reducer";
import {AppRootStateType} from "../../../../Redux/Redux-store";



export const ProfileStatus = () => {

    const dispatch = useDispatch()
    const statusFromState = useSelector<AppRootStateType, string>(state => state.profilePage.status)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(statusFromState)

    useEffect(() => {
        setStatus(statusFromState)
    }, [statusFromState])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusTC(status))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return <>
        {!editMode
            ? <div>
                <div onDoubleClick={activateEditMode}>{statusFromState || "Status not found"} </div>
            </div>
            : <div>
                <input autoFocus
                       onBlur={deActivateEditMode}
                       value={status}
                       onChange={onStatusChange}
                />


            </div>}

    </>

}