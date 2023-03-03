import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import {
	DesktopOutlined,
	PieChartOutlined,
	UserOutlined,
	WechatOutlined
} from '@ant-design/icons'
import style from './App.module.css'
import { HeaderPage } from './components/Header/HeaderPage'
import { useAppDispatch, useAppSelector } from './Redux/redux-store'
import { initializeAppTC } from './Redux/app-reducer'
import { Preloader } from './common/Preloader/Preloader'
import { getItem, MenuItem } from './MenuItemData'
import { Routers } from './components/Routers/Routes'
import { ErrorSnackBar } from './common/ErrorSnackBar/ErrorSnackBar'
import { getAuthUserId } from './selectors/auth-selectors'
import { getIsInit } from './selectors/app-selectors'

const { Content, Footer, Sider } = Layout

export const App: React.FC = () => {
	const dispatch = useAppDispatch()

	const [collapsed, setCollapsed] = useState(false)
	const initialized = useAppSelector<boolean>(getIsInit)
	const myId = useAppSelector<number | null>(getAuthUserId)

	const items: MenuItem[] = [
		getItem(
			<NavLink to={`/profile/${myId}`}>Profile</NavLink>,
			'profile',
			<PieChartOutlined />
		),
		getItem(<NavLink to='/dialogs'>Message</NavLink>, 'dialogs', <DesktopOutlined />),
		getItem(<NavLink to='/users'>Users</NavLink>, 'users', <UserOutlined />),
		getItem(<NavLink to='/chat'>Chat</NavLink>, 'chat', <WechatOutlined />)
	]

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [dispatch])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<>
			<ErrorSnackBar />
			<Layout className={style.app_wrapper}>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={value => setCollapsed(value)}
				>
					<Menu theme='dark' selectable={false} mode='inline' items={items} />
				</Sider>
				<Layout className='site-layout'>
					<HeaderPage />
					<Content className={style.content}>
						<Breadcrumb className={style.breadCrumb}></Breadcrumb>

						<Routers />
					</Content>

					<Footer className={style.footer}>© Created by Maxim Dmitriev</Footer>
				</Layout>
			</Layout>
		</>
	)
}
