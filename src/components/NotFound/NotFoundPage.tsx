import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
	const navigate = useNavigate()

	const backHandler = () => {
		navigate('/')
	}
	return (
		<div>
			<Result
				status='404'
				title='404'
				subTitle='Sorry, the page you visited does not exist.'
				extra={
					<Button type='primary' onClick={backHandler}>
						Back
					</Button>
				}
			/>
		</div>
	)
}
