import React from 'react';
import {UserType} from "../../Redux/users-reducer";
import Avatar from "../../img/UsersAvatar.jpg"
import axios from "axios";

type UserPropsType = {
    users: Array<UserType>
    follow: (id: string) => void
    unFollow: (id: string) => void
    setUsers: (users: Array<UserType>) => void
    pageSize:number
    totalUsersCount:number
}

class UsersC extends React.Component<UserPropsType, any> {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }


    render() {

        let pageCount = this.props.totalUsersCount / this.props.pageSize
        return <div>

            <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>

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