import React, {FC} from 'react';
import style from "./Users.module.css";
import UserAvatar from '../../img/UsersAvatar.jpg'
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/users-reducer";

type PropsType = {
    currentPage: number
    follow: (userID: number) => void
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    unFollow: (userID: number) => void
    toggleIsFollow: (isFollow: boolean, userId: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    followThunk: (userId: number) => any
    unfollowThunk: (userId: number) => any
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
                {pages.map((p) => <span key={p}
                                        className={`${props.currentPage === p && style.pagesCount}`}
                                        onClick={() => {
                                            props.onPageChanged(p)
                                        }}
                >{p}</span>)}
            </div>
            {props.users.map(el =>
                    <div key={el.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + el.id}>

                        <img src={el.photos.small !== null ? el.photos.small : UserAvatar}
                             alt="imgAvatar"
                             style={{width: "50px", height: "50px"}}/>
                          </NavLink>
                        </div>
                    <div>
                        {el.followed
                            ? <button disabled={props.followingInProgress.some(id => id === el.id)}
                                      onClick={() => {
                                          props.unfollowThunk(el.id)
                                      }}>unFollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === el.id)}
                                      onClick={() => {
                                          props.followThunk(el.id)
                                      }}>Follow</button>}
                    </div>
                </span>

                        <span>
                  <div>{el.name}    </div>
                 <div> status: {el.status !== null ? el.status : "статус не найден"}    </div>
            </span>


                    </div>
            )}
        </div>
    );
};

export default UsersC;