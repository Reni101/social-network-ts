import React from 'react'
import { Spin } from 'antd'
export const Preloader = () => {
	return (
		<div>
			<Spin tip='Loading' size='large'></Spin>
		</div>
	)
}
