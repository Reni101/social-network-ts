import React, { useEffect, useRef, useState } from 'react'
import style from './MessageChat.module.css'
import { useAppSelector } from '../../../Redux/Redux-store'
import { NavLink } from 'react-router-dom'
import avatar from '../../../assets/UsersAvatar.jpg'
import { ChatMessageType } from '../../../Redux/Types'

export const MessagesChat = React.memo(() => {
	const messages = useAppSelector<ChatMessageType[]>(
		state => state.chat.messages
	)
	const messagesAnchorRef = useRef<HTMLDivElement>(null)
	const [isAutoScroll, setIsAutoScroll] = useState(true)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget
		if (
			Math.abs(
				element.scrollHeight - element.scrollTop - element.clientHeight
			) < 300
		) {
			!isAutoScroll && setIsAutoScroll(true)
		} else {
			isAutoScroll && setIsAutoScroll(false)
		}
	}
	useEffect(() => {
		if (isAutoScroll) {
			messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])
	return (
		<div className={style.messagesContainer} onScroll={scrollHandler}>
			{messages.map((el, index) => {
				return (
					<div key={index + Date.now()} className={style.message}>
						<NavLink to={'/profile/' + el.userId}>
							<img
								src={el.photo ? el.photo : avatar}
								alt=''
								className={style.avatar}
							/>
						</NavLink>
						<span className={style.text}>{el.userName}: </span>
						<span>{el.message}</span>
					</div>
				)
			})}
			<div ref={messagesAnchorRef}></div>
		</div>
	)
})
