import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListComment from './ListComment'

class DataItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            timeline: this.props.timelineReducers.timeline || '',
            comment: this.props.timelineReducers.comment || '',
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

    //COMMENT

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    handleCreateComment(e) {
        e.preventDefault()
        let comment = this.state.comment.trim()
        if (!comment) {
            return
        }
        // console.log(this.props.timelineReducers)
        let User = {
            id: Auth.getUser().id,
            username: Auth.getUser().username
        }
        this.props.createComment(this.props.timelineReducers.id, User, comment)
        this.setState({
            comment: ''
        })
    }


    render() {
        const {timelineReducers, commentReducers} = this.props
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
                </div>
            )
        }
        else {
            // console.log("dari data timeline: ", timelineReducers.Comments)
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button onClick={this.clickDeleteTimeline.bind(this)} className="btn btn-danger">Delete</button>
                        <button onClick={this.clickEditTimeline.bind(this)} className="btn btn-warning">Edit</button>
                    </div>
                    <div className="panel-body">

                        <div className="panel-group">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="panel-title">
                                        <h3>
                                            <a data-toggle="collapse" href={'#collapse'+timelineReducers.id}>
                                                {timelineReducers.User.username}
                                            </a>
                                        </h3>
                                        <p>{timelineReducers.timeline}</p>
                                    </div>
                                </div>
                                <div id={'collapse'+timelineReducers.id} className="panel-collapse collapse in">
                                    <div className="panel-body">
                                        <ListComment commentReducers={timelineReducers.Comments} deleteComment={this.props.deleteComment} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="panel-footer">
                        <form onSubmit={this.handleCreateComment.bind(this)}m className="form-inline">
                            <div className="form-group">
                                <label>Photo</label>
                                <input value={this.state.comment} onChange={this.handleCommentChange.bind(this)} type="text" className="form-control" />
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
    timelineReducers: PropTypes.array.isRequired,
    // commentReducers: PropTypes.array.isRequired
}

// function mapStateToProps(state) {
//     return {
//         timelineReducers: state.timelineReducers,
//         // commentReducers: state.commentReducers
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {actions: bindActionCreators(AppActions, dispatch)}
// }

export default DataItem

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(DataItem)