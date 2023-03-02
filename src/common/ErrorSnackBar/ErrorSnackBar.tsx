import React, { memo, useEffect } from 'react'
import { message } from 'antd'
import { useAppDispatch, useAppSelector } from '../../Redux/redux-store'
import { setAppError } from '../../Redux/app-reducer'

export const ErrorSnackBar = memo(() => {
	const dispatch = useAppDispatch()
	const errorMessage = useAppSelector(state => state.app.error)

	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		errorMessage &&
			dispatch(setAppError(null)) &&
			messageApi.error(errorMessage, 4, () => {})
	}, [errorMessage, dispatch])

	return <>{contextHolder}</>
})
