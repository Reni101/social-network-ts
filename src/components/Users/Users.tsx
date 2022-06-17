import React from 'react';
import {UsersType} from "../../Redux/users-reducer";

type UsersPropstype = {
    users:Array<UsersType>
    follow:(id:string)=>void
    unFollow:(id:string)=>void
}

const Users = (props: UsersPropstype) => {
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