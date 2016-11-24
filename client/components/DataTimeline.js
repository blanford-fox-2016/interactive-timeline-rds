import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {timelineReducers} = this.props
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <p>{timelineReducers.timeline}</p>
                    <p>{timelineReducers.UserId}</p>
                </div>
            </div>
        )
    }
}

DataItem.propTypes = {
    timelineReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

export default DataItem