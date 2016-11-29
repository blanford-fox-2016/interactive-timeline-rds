import React, {Component, PropTypes} from 'react'
import {Auth} from '../public/scripts/token'
export default class FormTimeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeline: this.props.timeline || ''
        }
    }

    handleTimelineChange(e) {
        this.setState({
            timeline: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let timeline = this.state.timeline.trim()
        if (!timeline) {
            return
        }
        let User = {
            id:Auth.getUser().id,
            username: Auth.getUser().username
        }
        this.props.onSave(User, timeline)
        this.setState({
            timeline: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <textarea value={this.state.timeline} onChange={this.handleTimelineChange.bind(this)} rows="4" className="form-control" placeholder="What's in your mind"></textarea>
                </div>
                <div>
                    <button type="submit" className="col-sm-12 btn btn-primary">Post</button>
                </div>
            </form>
        )
    }
}

FormTimeline.propTypes = {
    timeline: PropTypes.string,
    onSave: PropTypes.func.isRequired
}