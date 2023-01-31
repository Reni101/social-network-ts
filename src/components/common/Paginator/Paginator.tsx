import React, {FC, useEffect, useState} from 'react';
import style from "./Paginator.module.css";
import className from "classnames"
import {Pagination} from "antd";


type PropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged}) => {

    // let pageCount = Math.ceil(totalItemsCount / pageSize)
    // let pages: Array<number> = []
    // for (let i = 1; i <= pageCount; i++) {
    //     pages.push(i)
    // }
    //
    // let portionSize = 10
    // let portionCount = Math.ceil(pageCount / portionSize)
    // let [portionNumber, setPortionNumber] = useState(1)
    // let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // let rightPortionPageNumber = portionNumber * portionSize

    // useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)),
    //     [currentPage]);
    return (

        <div className={style.containerPaginator}>


            <Pagination defaultCurrent={currentPage} total={totalItemsCount} pageSizeOptions={["10"]}
                        onChange={(page, pageSize) => {
                            onPageChanged(page)
                        }}/>


            {/*{portionNumber > 1 && <button onClick={() => {*/}
            {/*    setPortionNumber(portionNumber - 1)*/}
            {/*}}>Prev </button>}*/}


            {/*{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)*/}
            {/*    .map((p) => <span key={p}*/}

            {/*                      className={className({[style.selectedPage]: currentPage === p}, style.pageNumber)}*/}
            {/*                      onClick={() => {*/}
            {/*                          onPageChanged(p)*/}
            {/*                      }}*/}
            {/*    >{p}</span>)}*/}
            {/*{portionCount > portionNumber && <button onClick={() => {*/}
            {/*    setPortionNumber(portionNumber + 1)*/}
            {/*}}>next </button>}*/}

        </div>
    );
};

//`${currentPage === p ? style.pagesCount : null}`
