import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import UserAvatar from "../../../img/UsersAvatar.jpg";
import {UserType} from "../../../Redux/users-reducer";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}
export const User: FC<PropsType> = ({user,followingInProgress,followThunk,unfollowThunk}) => {
    return (
        <div key={user.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>

                        <img src={user.photos.small !== null ? user.photos.small : UserAvatar}
                             alt="imgAvatar"
                             style={{width: "50px", height: "50px", marginTop:"5px"}}/>
                          </NavLink>
                        </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollowThunk(user.id)
                                      }}>unFollow</button>

                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          followThunk(user.id)
                                      }}>Follow</button>}
                    </div>
                </span>

            <span>
                  <div>{user.name}    </div>
                 <div> status: {user.status !== null ? user.status : "статус не найден"}    </div>
            </span>


        </div>
    );
};

