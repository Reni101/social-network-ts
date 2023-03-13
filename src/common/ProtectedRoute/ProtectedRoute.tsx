import React, { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../Redux/redux-store'
import { Path } from '../../Enums/Path'
type PropsType = {
	children: ReactNode
}
export const ProtectedRoute: FC<PropsType> = ({ children }) => {
	const isAuth = useAppSelector(state => state.auth.isAuth)

	return isAuth ? <>{children}</> : <Navigate to={Path.LOGIN} />
}
