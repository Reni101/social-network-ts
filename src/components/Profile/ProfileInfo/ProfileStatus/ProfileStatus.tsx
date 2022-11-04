import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
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
                <div onDoubleClick={activateEditMode}>{props.status || "Status not found"} </div>
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