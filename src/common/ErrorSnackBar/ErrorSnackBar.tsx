import React from 'react'
import { message } from 'antd'
import { useAppDispatch, useAppSelector } from '../../Redux/redux-store'
import { setAppError } from '../../Redux/app-reducer'

export const ErrorSnackBar = () => {
	const dispatch = useAppDispatch()
	const errorMessage = useAppSelector(state => state.app.error)
	const [messageApi, contextHolder] = message.useMessage()

	const error = () => {
		messageApi.open({
			type: 'error',
			content: errorMessage,
			duration: 5,
			onClose() {
				dispatch(setAppError(null))
			}
		})
	}

	return (
		<>
			{contextHolder}
			{errorMessage && error()}
		</>
	)
}
