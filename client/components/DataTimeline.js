import React, {Component, PropTypes} from 'react'

class DataTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      content: this.props.data.content || ''
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
      return ;
    } else {
      this.props.editTimeline(this.props.data.id, content)
      this.setState({editing: false})
    }
  }

  handleCancelEdit(){
    this.setState({
      editing: false
    })
  }

  render() {
    const {data, deleteTimeline, editData} = this.props
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
        <div className="panel panel-default">
          <div className="panel-body">
            <span>
              <h3>{data.User.username + " - " + data.User.email}</h3>
              {data.content}
            </span>
          </div>
          <div className="panel-footer">
            <button className="btn btn-success btn-sm" type="button" onClick={() => this.handleEditClick(data.id)}>
              <span className="glyphicon glyphicon-edit"></span>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" type="button" onClick={()=> confirm('Are you sure want to delete this contact ?') ? deleteTimeline(data.id) : ''}>
              <span className="glyphicon glyphicon-trash"></span>
              Delete
            </button>
          </div>
        </div>
      )
    }
  }
}

DataTimeline.propTypes = {
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired
}

export default DataTimeline
