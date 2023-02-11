import { appReducer, setInitialized } from '../Redux/app-reducer'

test('setInitialized is work correct', () => {
	let initialState = {
		initialized: false
	}

	let action = setInitialized({ value: true })
	let newState = appReducer(initialState, action)

	expect(newState.initialized).toBeTruthy()
})
