import React, {FC} from 'react';
import style from "./Users.module.css";
import UserAvatar from '../../img/UsersAvatar.jpg'
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/users-reducer";
import {usersAPI} from "../../api/api";

type PropsType = {
    currentPage: number
    follow: (userID: number) => void
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    unFollow: (userID: number) => void
    users: Array<UserType>
}

const UsersC: FC<PropsType> = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>

            <div>
                {pages.map((p, index) => <span key={index}
                                               className={`${props.currentPage === p && style.pagesCount}`}
                                               onClick={() => {
                                                   props.onPageChanged(p)
                                               }}
                >{p}</span>)}
            </div>
            {props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + el.id}>

                        <img src={el.photos.small !== null ? el.photos.small : UserAvatar}
                             alt ="imgAvatar"
                             style={{width: "50px", height: "50px"}}/>
                          </NavLink>
                        </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                usersAPI.unfollowUser(el.id)
                                    .then((data) => {
                                        if (data.resultCode === 0) props.unFollow(el.id)
                                    })
                            }}>unFollow</button>

                            : <button onClick={() => {
                                usersAPI.followUser(el.id)
                                    .then((data) => {
                                        if (data.resultCode === 0) props.follow(el.id)
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
            <span>
                  <div>{el.name}    </div>
                 <div> status: {el.status !== null ? el.status : "статус не найден"}    </div>
            </span>

                </span>

                </div>
            )}
        </div>
    );
};

export default UsersC;