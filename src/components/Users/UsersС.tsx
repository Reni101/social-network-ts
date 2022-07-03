import React from 'react';
import {UserType} from "../../Redux/users-reducer";
import Avatar from "../../img/UsersAvatar.jpg"
import axios from "axios";
import style from './Users.module.css'


type UserPropsType = {
    users: Array<UserType>
    follow: (id: string) => void
    unFollow: (id: string) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage:(pageNumber:number)=>void
}

class UsersC extends React.Component<UserPropsType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }


    render() {

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        return <div>

            <div>
                {/* @ts-ignore*/}
                {pages.map(p => <span className={this.props.currentPage === p && style.pagesCount}
                onClick={()=>{this.props.setCurrentPage(p)}}
                >{p}</span>)}
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