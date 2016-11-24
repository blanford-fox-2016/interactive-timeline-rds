import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            timeline: this.props.timelineReducers.timeline || '',
        }
    }

    clickDeleteTimeline() {
        if (confirm("are you sure want ti delete")) {
            this.props.deleteTimeline(this.props.timelineReducers.TempTimelineId)
        }
    }

    clickEditTimeline() {
        this.setState({
            editing: true
        })
    }

    cancelEditTimeline() {
        this.setState({
            editing: false
        })
    }

    handleTimelineChange(e) {
        this.setState({
            timeline: e.target.value
        })
    }

    handleSaveEditTimeline(e) {
        e.preventDefault()
        let timeline = this.state.timeline.trim()
        if (!timeline) {
            return
        }
        this.props.editTimeline(this.props.timelineReducers.TempTimelineId, timeline)
        this.setState({
            editing: false
        })
    }


    render() {
        const {timelineReducers, deleteData, editData} = this.props
        if (this.state.editing) {
            return(
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button onClick={this.clickDeleteTimeline.bind(this)} className="btn btn-danger">Delete</button>
                        <button onClick={this.clickEditTimeline.bind(this)} className="btn btn-warning">Edit</button>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSaveEditTimeline.bind(this)}>
                            <input className="form-control" type="text" placeholder="Timeline" value={this.state.timeline} onChange={this.handleTimelineChange.bind(this)} />
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-warning" onClick={this.cancelEditTimeline.bind(this)}>Candel</button>
                        </form>
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
        else {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button onClick={this.clickDeleteTimeline.bind(this)} className="btn btn-danger">Delete</button>
                        <button onClick={this.clickEditTimeline.bind(this)} className="btn btn-warning">Edit</button>
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
}

DataItem.propTypes = {
    timelineReducers: PropTypes.array.isRequired
}

export default DataItem