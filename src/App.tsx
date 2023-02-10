import React, { useEffect, useState } from 'react'
import './index.css'
import {
	DesktopOutlined,
	PieChartOutlined,
	UserOutlined,
	WechatOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'

import { HeaderPage } from './components/Header/HeaderPage'
import { useDispatch } from 'react-redux'
import { useAppSelector } from './Redux/Redux-store'
import { InitializeAppTC } from './Redux/app-reducer'
import UsersPage from './components/Users/UsersPage'
import { LoginPage } from './components/Login/LoginPage'
import { ChatPage } from './components/ChatWS/ChatPage'
import { DialogsContainer } from './components/Dialogs/DialogsContainer'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { ProfileContainer } from './components/Profile/ProfileContainer'
import { NotFoundPage } from './components/NotFound/NotFoundPage'
import { Preloader } from './components/common/Preloader/Preloader'
const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem
}

export const App: React.FC = () => {
	const dispatch = useDispatch()
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const [collapsed, setCollapsed] = useState(false)
	const initialized = useAppSelector<boolean>(state => state.app.initialized)
	const myId = useAppSelector<number | null>(state => state.auth.userId)

	const items: MenuItem[] = [
		getItem(
			<NavLink to={`/profile/${myId}`}>Profile</NavLink>,
			'profile',
			<PieChartOutlined />
		),
		getItem(
			<NavLink to='/dialogs'>Message</NavLink>,
			'dialogs',
			<DesktopOutlined />
		),
		getItem(
			<NavLink to='/users'>Users</NavLink>,
			'users',
			<UserOutlined />
		),
		getItem(<NavLink to='/chat'>Chat</NavLink>, 'chat', <WechatOutlined />)
	]

	useEffect(() => {
		dispatch(InitializeAppTC())
	}, [])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<Menu
					theme='dark'
					selectable={false}
					mode='inline'
					items={items}
				/>
			</Sider>
			<Layout className='site-layout'>
				<HeaderPage />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer
						}}
					>
						<Routes>
							<Route
								path='/profile/:userId?'
								element={<ProfileContainer />}
							/>
							<Route
								path='/dialogs'
								element={<DialogsContainer />}
							/>
							<Route path='/users' element={<UsersPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/chat' element={<ChatPage />} />
							<Route
								path='/notFound'
								element={<NotFoundPage />}
							/>

							<Route
								path='*'
								element={<Navigate to={`/notFound`} />}
							/>
						</Routes>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>
					© Created by Maxim Dmitriev
				</Footer>
			</Layout>
		</Layout>
	)
}
