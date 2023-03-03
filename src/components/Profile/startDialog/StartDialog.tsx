import React, { FC } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../Redux/redux-store'
import { startNewDialogs } from '../../../Redux/dialogs-reducer'

type PropsType = {
	userId: number
}
export const StartDialog: FC<PropsType> = ({ userId }) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const writeMessageHandler = async () => {
		await dispatch(startNewDialogs({ userId }))
		navigate(`/dialogs?userIdChat=${userId}`)
	}

	return (
		<>
			<Button onClick={writeMessageHandler}>write a message</Button>
		</>
	)
}
