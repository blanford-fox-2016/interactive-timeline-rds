import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
    constructor(props) {
        super(props)
    }

    clickDeleteTimeline() {
        if (confirm("are you sure want ti delete")) {
            this.props.deleteTimeline(this.props.timelineReducers.TempTimelineId)
        }
    }

    render() {
        const {timelineReducers} = this.props
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <button onClick={this.clickDeleteTimeline.bind(this)} className="btn btn-danger">Delete</button>
                </div>
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