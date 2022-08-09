import React from 'react';

const ProfileStatus = (props: any) => {
    return (<>
            {props.editMode
                ? <div>
                    <span>{props.status}</span>
                </div>
                : <div>
                    <input value={props.status}/>
                </div>}

        </>
    );
};

export default ProfileStatus;