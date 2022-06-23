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
            {props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photos.smal !== undefined ? el.photos.small : Avatar}
                             style={{width: "50px", height: "50px"}}/>
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

export default Users;