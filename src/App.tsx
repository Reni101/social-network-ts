import React, { useEffect } from 'react'
import { Breadcrumb, Layout } from 'antd'
import { HeaderPage } from 'components/Header/HeaderPage'
import { useAppDispatch, useAppSelector } from 'Redux/redux-store'
import { initializeAppTC } from 'Redux/app-reducer'
import { Preloader } from 'common/Preloader/Preloader'
import { MenuComponent } from 'components/Menu/Menu'
import { Routers } from 'components/Routers/Routes'
import { ErrorSnackBar } from 'common/ErrorSnackBar/ErrorSnackBar'
import { getAuthUserId } from 'selectors/auth-selectors'
import { getIsInit } from 'selectors/app-selectors'
import style from './App.module.css'

const { Content, Footer } = Layout

export const App: React.FC = () => {
	const dispatch = useAppDispatch()

	const initialized = useAppSelector<boolean>(getIsInit)
	const userAuthId = useAppSelector<number | null>(getAuthUserId)

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
				{userAuthId && <MenuComponent userAuthId={userAuthId} />}
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
