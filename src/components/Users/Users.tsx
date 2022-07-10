import React from 'react';
import {UserType} from "../../Redux/users-reducer";
import Avatar from "../../img/UsersAvatar.jpg"
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: string) => void
    unFollow: (id: string) => void
    setUsers: (users: Array<UserType>) => void
}

const Users = (props: UsersPropsType) => {
    let getusers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            });
        }
    }

    return (
        <div>
            <button onClick={getusers}>Get users</button>
            {props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photos.smal !== undefined ? el.photos.small : Avatar}
                             style={{width: "50px", height: "50px"}}/>
                    </div>
                    <div>

                        {el.followed
                            ? <button onClick={() => {

                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY":"fab19197-098e-4362-876a-0c0797e21ac6"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unFollow(el.id)
                                        }
                                    });

                            }}>Unfollow</button>

                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {}, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY":"fab19197-098e-4362-876a-0c0797e21ac6"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(el.id)
                                        }
                                    });

                            }}>Follow</button>}

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

export default Users;