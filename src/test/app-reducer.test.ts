import { appReducer, appStatusType, initializeAppTC } from '../Redux/app-reducer'

test('setInitialized is work correct', () => {
	let initialState = {
		initialized: false,
		error: null as string | null,
		status: 'idle' as appStatusType
	}

	let action = initializeAppTC.fulfilled({ value: true }, '', undefined)
	let newState = appReducer(initialState, action)

	expect(newState.initialized).toBeTruthy()
})
