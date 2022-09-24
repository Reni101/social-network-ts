import React, {ChangeEvent, useEffect, useState} from 'react';


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

export const ProfileStatus = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)
    useEffect(() => {

    }, [])

    const activateEditMode = () => {
        setEditMode(true)
        setStatus(props.status)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return <>
        {!editMode
            ? <div>
                <span onDoubleClick={activateEditMode}>{props.status || "Status not found"} </span>
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

export default ProfileStatus;