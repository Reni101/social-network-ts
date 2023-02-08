import { addPostAC, profileReducer } from '../Redux/profile-reducer'
import { v1 } from 'uuid'
import { PostsDataType, ProfileType } from '../Redux/Types'

test('new post should be added', () => {
	//1. start data
	let initialState = {
		postsData: [
			{ id: v1(), message: 'My first post', likeCount: 0 }
		] as Array<PostsDataType>,
		profile: null as ProfileType | null,
		status: ''
	}
	//2. action
	let action = addPostAC({ text: 'new Text' })
	let newState = profileReducer(initialState, action)

	//3. expectation
	expect(newState.postsData.length).toBe(2)
	expect(newState.postsData[1].likeCount).toBe(0)
})
