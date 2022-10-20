import React, {FC} from 'react';
import style from "./Paginator.module.css";

type PropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator: FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            {pages.map((p) => <span key={p}

                                    className={`${currentPage === p && style.pagesCount}`}
                                    onClick={() => {

                                        onPageChanged(p)
                                    }}
            >{p}</span>)}
        </div>
    );
};

