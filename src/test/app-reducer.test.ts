import { appReducer, initializeAppTC } from '../Redux/app-reducer'

test('setInitialized is work correct', () => {
	let initialState = {
		initialized: false
	}

	let action = initializeAppTC.fulfilled({ value: true }, '')
	let newState = appReducer(initialState, action)

	expect(newState.initialized).toBeTruthy()
})
