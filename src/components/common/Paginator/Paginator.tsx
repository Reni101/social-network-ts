import React, {FC} from 'react';
import style from "./Paginator.module.css";

import {Pagination} from "antd";


type PropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator: FC<PropsType> = React.memo(({totalItemsCount, pageSize, currentPage, onPageChanged}) => {
    const changePageHandler = (page: number) => {
        if (page === currentPage) return
        onPageChanged(page)
    }
    return (
        <div className={style.containerPaginator}>


            <Pagination current={currentPage}
                        defaultCurrent={1}
                        total={totalItemsCount}
                        pageSizeOptions={["10"]}
                        onChange={changePageHandler}/>

        </div>
    );
})

//`${currentPage === p ? style.pagesCount : null}`
