import React, { useState } from 'react'
import style from './Search.module.css'
import Input from 'antd/lib/input/Input'
import { Button, Select } from 'antd'

export type friendType = 'all' | 'myFriend'

type PropsType = {
	termQuery: string
	friendQuery: friendType
	setSearchParams: ({}: { name: string; friend: friendType } | {}) => void
}
export const Search = (props: PropsType) => {
	const [term, setTerm] = useState(props.termQuery)
	const [onlyFriend, setOnlyFriend] = useState<friendType>(props.friendQuery)

	const selectHandler = (value: friendType) => {
		setOnlyFriend(value)
	}
	const inputHandler = (e: any) => {
		setTerm(e.target.value)
	}
	const buttonHandler = () => {
		props.setSearchParams({ name: term, friend: onlyFriend })
	}
	const pressEnter = (e: any) => {
		e.key === 'Enter' && buttonHandler()
	}
	return (
		<div className={style.container}>
			<Input
				onKeyUp={pressEnter}
				autoFocus
				defaultValue={term}
				placeholder='Basic usage'
				onChange={inputHandler}
				name='term'
			/>

			<Select
				defaultValue={onlyFriend}
				style={{ width: 120 }}
				onChange={selectHandler}
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'myFriend', label: 'my friend' }
				]}
			/>
			<Button type='primary' onClick={buttonHandler}>
				Search
			</Button>
		</div>
	)
}
