import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { setAppError, setAppStatus } from '../Redux/app-reducer'

export const handleServerAppError = (
	messages: string[],
	dispatch: Dispatch,
	rejectWithValue: Function
) => {
	if (messages.length) {
		dispatch(setAppError(messages[0]))
		return rejectWithValue(messages[0])
	} else {
		dispatch(setAppStatus('failed'))
		dispatch(setAppError('Some error occurred'))
		return rejectWithValue('Some error occurred')
	}
}

export const handleAsyncServerNetworkError = (
	e: Error | AxiosError,
	dispatch: Dispatch,
	rejectWithValue: Function
) => {
	if (axios.isAxiosError(e)) {
		const error = e.response?.data
			? (e.response.data as { message: string }).message
			: e.message
		dispatch(setAppError(error))
		return rejectWithValue(error)
	} else {
		dispatch(setAppStatus('failed'))
		dispatch(setAppError(`Native error ${e.message}`))
		return rejectWithValue(`Native error ${e.message}`)
	}
}
