import React, { memo, useEffect } from 'react'
import { message } from 'antd'
import { useAppDispatch, useAppSelector } from '../../Redux/redux-store'
import { setAppError } from '../../Redux/app-reducer'
import { getError } from '../../selectors/app-selectors'

export const ErrorSnackBar = memo(() => {
	const dispatch = useAppDispatch()
	const errorMessage = useAppSelector(getError)

	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		errorMessage && messageApi.error(errorMessage, 4)
		dispatch(setAppError(null))
	}, [errorMessage, dispatch])

	return <>{contextHolder}</>
})
