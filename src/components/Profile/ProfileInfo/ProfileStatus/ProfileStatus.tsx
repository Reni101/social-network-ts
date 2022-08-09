import React from 'react';

class ProfileStatus extends React.Component<any, any> {


    state = {
        editMode: false

    }

    render() {
        return (<>
                {!this.state.editMode
                    ? <div>
                        <span>{this.props.status} </span>
                    </div>
                    : <div>
                        <input value={this.props.status}/>
                    </div>}

            </>
        );
    }
}

export default ProfileStatus;