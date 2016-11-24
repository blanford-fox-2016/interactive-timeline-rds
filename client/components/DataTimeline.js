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
                    <h3>{timelineReducers.User.username}</h3>
                    <p>{timelineReducers.timeline}</p>
                </div>
                <div className="panel-footer">
                    <form className="form-inline">
                        <div className="form-group">
                            <label>Photo</label>
                            <input type="text" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

DataItem.propTypes = {
    timelineReducers: PropTypes.array.isRequired
}

export default DataItem