import React, { ChangeEvent, useRef } from 'react'
import { Button } from 'antd'

import { savePhotoTC } from '../../../Redux/profile-reducer'
import { useAppDispatch } from '../../../Redux/redux-store'

export const UploadPhoto = () => {
	const dispatch = useAppDispatch()
	const inputRef = useRef<HTMLInputElement>(null)

	const selectFileHandler = () => {
		inputRef && inputRef.current?.click()
	}

	const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files!.length) {
			dispatch(savePhotoTC({ file: e.target.files![0] }))
		}
	}
	return (
		<>
			<Button onClick={selectFileHandler}> change photo</Button>
			<input
				style={{ display: 'none' }}
				accept='image/jpeg'
				ref={inputRef}
				type='file'
				onChange={mainPhotoSelected}
			/>
		</>
	)
}
