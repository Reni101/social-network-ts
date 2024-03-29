import React, { useState } from 'react'

import Input from 'antd/lib/input/Input'
import { Button, Select } from 'antd'

import style from './Search.module.css'

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

	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setTerm(e.currentTarget.value)
	}

	const buttonHandler = () => {
		props.setSearchParams({ name: term, friend: onlyFriend })
	}

	const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.key === 'Enter' && buttonHandler()
	}

	return (
		<div className={style.container}>
			<Input
				onKeyUp={pressEnter}
				autoFocus
				defaultValue={term}
				placeholder='Find users'
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
