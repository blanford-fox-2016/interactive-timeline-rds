import React, {Component, PropTypes} from 'react'

class DataComment extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         editing: false,
    //         timeline: this.props.timelineReducers.timeline || '',
    //     }
    // }
    //
    // clickDeleteTimeline() {
    //     if (confirm("are you sure want ti delete")) {
    //         this.props.deleteTimeline(this.props.timelineReducers.TempTimelineId)
    //     }
    // }
    //
    // clickEditTimeline() {
    //     this.setState({
    //         editing: true
    //     })
    // }
    //
    // cancelEditTimeline() {
    //     this.setState({
    //         editing: false
    //     })
    // }
    //
    // handleTimelineChange(e) {
    //     this.setState({
    //         timeline: e.target.value
    //     })
    // }
    //
    // handleSaveEditTimeline(e) {
    //     e.preventDefault()
    //     let timeline = this.state.timeline.trim()
    //     if (!timeline) {
    //         return
    //     }
    //     this.props.editTimeline(this.props.timelineReducers.TempTimelineId, timeline)
    //     this.setState({
    //         editing: false
    //     })
    // }


    render() {
        const {commentReducers, deleteData, editData} = this.props
        console.log("dari datacomment: ", commentReducers)
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-warning">Edit</button>
                </div>
                <div className="panel-body">
                    <h4>{commentReducers.User.username}</h4>
                    <p>{commentReducers.comment}</p>
                </div>
            </div>
        )

    }
}

DataComment.propTypes = {
    commentReducers: PropTypes.array.isRequired
}

export default DataComment