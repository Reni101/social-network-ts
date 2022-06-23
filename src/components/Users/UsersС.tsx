import React from 'react';
import {UserType} from "../../Redux/users-reducer";
import Avatar from "../../img/UsersAvatar.jpg"
import axios from "axios";

type UserPropsType = {
    users: Array<UserType>
    follow: (id: string) => void
    unFollow: (id: string) => void
    setUsers: (users: Array<UserType>) => void
}

class UsersC extends React.Component<UserPropsType, any> {
    getusers = () => {
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            });
        }
    }

    render() {
        return <div>
            <button onClick={this.getusers}>Get users</button>
            {this.props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photos.smal !== undefined ? el.photos.small : Avatar}
                             style={{width: "50px", height: "50px"}}/>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {

                                this.props.follow(el.id)
                            }}>follow</button>


                            : <button onClick={() => {
                                this.props.unFollow(el.id)
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
    }
}

export default UsersC;