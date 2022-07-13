import React from 'react';
import style from "./Users.module.css";
import UserAvatar from '../../img/UsersAvatar.jpg'
import {NavLink} from "react-router-dom";

const UsersC = (props: any) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>

            <div>
                {pages.map((p, index) => <span key={index} className={`${props.currentPage === p && style.pagesCount}`}
                                               onClick={() => {
                                                   props.onPageChanged(p)
                                               }}
                >{p}</span>)}
            </div>
            {/* @ts-ignore*/}
            {props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' +el.id}>

                        <img src={el.photos.small !== null ? el.photos.small : UserAvatar}
                             style={{width: "50px", height: "50px"}}/>
                          </NavLink>
                        </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                props.follow(el.id)
                            }}>follow</button>


                            : <button onClick={() => {
                                props.unFollow(el.id)
                            }}>unFollow</button>}

                    </div>
                </span>
                    <span>
            <span>
                  <div>{el.name}    </div>
                 <div>{el.status}    </div>
            </span>
            <span>
                 <div> {"el.location.country"} </div>
                <div>  {'el.location.city'}  </div>
            </span>
                </span>

                </div>
            )}
        </div>
    );
};

export default UsersC;