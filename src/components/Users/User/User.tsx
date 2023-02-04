import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import UserAvatar from "../../../assets/UsersAvatar.jpg";
import {UserType} from "../../../Redux/users-reducer";
import {Button} from "antd";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}
export const User: FC<PropsType> = ({user, followingInProgress, followThunk, unfollowThunk}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>

                        <img src={user.photos.small !== null ? user.photos.small : UserAvatar}
                             alt="imgAvatar"
                             style={{width: "50px", height: "50px", marginTop: "5px"}}/>
                          </NavLink>
                        </div>
                    <div>
                        {user.followed
                            ? <Button type="primary" disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollowThunk(user.id)
                                      }}>unFollow
                            </Button>

                            : <Button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          followThunk(user.id)
                                      }}>Follow
                            </Button>}
                    </div>
                </span>

            <span>
                  <div>{user.name}    </div>
                 <div> status: {user.status !== null ? user.status : "статус не найден"}    </div>
            </span>


        </div>
    );
};

