import { Menu } from 'antd'
import React, { FC, memo, useState } from 'react'
import {
	DesktopOutlined,
	PieChartOutlined,
	UserOutlined,
	WechatOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sider from 'antd/es/layout/Sider'
import { Path } from '../../Enums/Path'

interface PropsType {
	userAuthId: number
}

export const MenuComponent: FC<PropsType> = memo(({ userAuthId }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [collapsed, setCollapsed] = useState(false)

	const items = [
		{
			key: 'profile',
			icon: <PieChartOutlined />
		},
		{
			key: 'dialogs',
			icon: <DesktopOutlined />
		},
		{
			key: 'users',
			icon: <UserOutlined />
		},
		{
			key: 'chat',
			icon: <WechatOutlined />
		}
	]

	const onClickNavigateHandler = (key: string) => {
		if (key === 'profile') {
			navigate(`${Path.PROFILE}/${userAuthId}`)
		} else {
			navigate(key)
		}
	}

	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<Menu
					theme='dark'
					selectable={false}
					mode='inline'
					items={items.map(el => ({
						label: t(`menu.${el.key}`),
						key: el.key,
						icon: el.icon
					}))}
					onClick={({ key }) => {
						onClickNavigateHandler(key)
					}}
				/>
			</Sider>
		</>
	)
})
