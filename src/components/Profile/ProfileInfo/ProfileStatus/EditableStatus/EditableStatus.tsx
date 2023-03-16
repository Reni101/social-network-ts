import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../../Redux/redux-store'
import { getStatus } from '../../../../../selectors/profile-slectors'
import { updateStatusTC } from '../../../../../Redux/profile-reducer'

export const EditableStatus = () => {
	const dispatch = useAppDispatch()
	const statusFromState = useAppSelector<string>(getStatus)

	const [editMode, setEditMode] = useState<boolean>(false)
	const [status, setStatus] = useState<string>(statusFromState)

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deActivateEditMode = () => {
		setEditMode(false)
		dispatch(updateStatusTC({ status }))
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	useEffect(() => {
		setStatus(statusFromState)
	}, [statusFromState])

	return (
		<>
			{editMode ? (
				<span onDoubleClick={activateEditMode}>{statusFromState}</span>
			) : (
				<span>
					<Input
						autoFocus
						style={{ width: '200px', position: 'absolute' }}
						onBlur={deActivateEditMode}
						value={status}
						onChange={onStatusChange}
					/>
				</span>
			)}
		</>
	)
}
