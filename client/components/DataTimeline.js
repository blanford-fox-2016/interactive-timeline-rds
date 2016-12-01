import React, {Component, PropTypes} from 'react'
import FromAddComment from './FromAddComment'
import ListCommentsByTimeline from './ListCommentsByTimeline'

class DataTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      content: this.props.data_timelines.content || ''
    }
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }

  handleEditClick(){
    this.setState({editing: true})
  }

  handleSaveEdit(e) {
    e.preventDefault()
    let content = this.state.content.trim()
    if (!content) {
      return
    } else {
      this.props.editTimeline(this.props.data_timelines.id, content)
      this.setState({editing: false})
    }
  }

  handleCancelEdit(){
    this.setState({
      editing: false
    })
  }

  render() {
    const {data_timelines, deleteTimeline, editTimeline, addComment } = this.props
    if (this.state.editing) {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="edit_timeline">Edit Timeline</label>
            <textarea id="edit_timeline" className="form-control" placeholder="Update your status" value={this.state.content} onChange={this.handleContentChange.bind(this)} ></textarea>
          </div>
          <button className="btn btn-default" onClick={this.handleSaveEdit.bind(this)} type="button"><span className="glyphicon glyphicon-pencil"></span>Edit Post</button>
          <button className="btn btn-default" onClick={this.handleCancelEdit.bind(this)} type="button">Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="panel panel-default">
            <div className="panel-body">
              <button className="btn btn-danger btn-sm pull-right" type="button" onClick={()=> confirm('Are you sure want to delete this contact ?') ? deleteTimeline(data_timelines.id) : ''}>
                <span className="glyphicon glyphicon-trash"></span>
                Delete
              </button>
              <button className="btn btn-success btn-sm pull-right" type="button" onClick={() => this.handleEditClick(data_timelines.id)}>
                <span className="glyphicon glyphicon-edit"></span>
                Edit
              </button>
              <span>
                <h3>{data_timelines.User.username + " - " + data_timelines.User.email}</h3>
                {data_timelines.content}
              </span>
            </div>
              <ListCommentsByTimeline data_timelines={data_timelines}  />
          </div>
            <FromAddComment data_timelines={data_timelines} onCommentSubmit={addComment} />
        </div>
      )
    }
  }
}

DataTimeline.propTypes = {
  data_timelines: PropTypes.object.isRequired,
  deleteTimeline: PropTypes.func.isRequired,
  editTimeline: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
}

export default DataTimeline
