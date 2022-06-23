import React from 'react';
import {UserType} from "../../Redux/users-reducer";
import {v1} from "uuid";
import axios from "axios";

type UsersPropsType = {
    users:Array<UserType>
    follow:(id:string)=>void
    unFollow:(id:string)=>void
    setUsers:(users:Array<UserType>) => void
}

const Users = (props: UsersPropsType) => {
    if(props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response=>{
            props.setUsers( )
        });



    }
    return (
        <div>
            {props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photoURL} style={{width: "50px", height: "50px"}}/>
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
                  <div>{el.fullName}    </div>
                 <div>{el.status}    </div>
            </span>
            <span>
                 <div> {el.location.country} </div>
                <div>  {el.location.city}  </div>
            </span>
                </span>

                </div>
            )}
        </div>
    );
};

export default Users;