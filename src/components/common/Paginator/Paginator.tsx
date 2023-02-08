import React, { FC } from 'react'
import style from './Paginator.module.css'
import { Pagination } from 'antd'

type PropsType = {
	pageSize: number
	totalItemsCount: number
	currentPage: number
	currentPageSize: number
	onPageChanged: (pageNumber: number, pageSize: number) => void
}

export const Paginator: FC<PropsType> = React.memo(
	({ totalItemsCount, currentPageSize, currentPage, onPageChanged }) => {
		const changePageHandler = (page: number, pageSize: number) => {
			if (pageSize === currentPageSize && page === currentPage) return
			onPageChanged(page, pageSize)
		}
		return (
			<div className={style.containerPaginator}>
				<Pagination
					current={currentPage}
					defaultPageSize={currentPageSize}
					defaultCurrent={1}
					total={totalItemsCount}
					pageSizeOptions={['5', '10', '20']}
					onChange={changePageHandler}
				/>
			</div>
		)
	}
)
