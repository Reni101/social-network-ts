import React from 'react';

type PropsType = {
    status: string
}
type StateType = {
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false
    }
    activateEditMode() {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (<>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status} </span>
                    </div>
                    : <div>
                        <input autoFocus
                            onBlur={this.deActivateEditMode.bind(this)}
                               value={this.props.status}/>
                    </div>}

            </>
        );
    }
}

export default ProfileStatus;