import React, {FC} from 'react';

import UserAvatar from '../../img/UsersAvatar.jpg'
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/users-reducer";

import {Paginator} from "../common/Paginator/Paginator";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}

const UsersC: FC<PropsType> = (props) => {

    return (
        <div>
             <Paginator onPageChanged={props.onPageChanged}
                        currentPage={props.currentPage}
                        pageSize={props.pageSize}
                        totalUsersCount={props.totalUsersCount}/> 
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