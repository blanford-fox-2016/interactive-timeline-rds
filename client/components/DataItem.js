import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      content: this.props.data.content || ''
    }
  }
  handleNameChange(e) {
    this.setState({name: e.target.value})
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
      this.props.editPost(this.props.data.id, content)
      this.setState({editing: false})
    }
  }
  render() {
    const {data, deletePost, editPost} = this.props
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSaveEdit.bind(this)}>
          <div className="form-group">
            <label>Edit Content</label>
            <input type="text" className="form-control" id="form-content" placeholder="Enter New Content" value={this.state.content} onChange={this.handleNameChange.bind(this)} />
          </div>
          <button className="btn btn-success" type="submit"><span className="glyphicon glyphicon-plus"></span>   Edit Content</button>
        </form>
      )
    } else {
      return (
        <li className="list-group-item">{data.id} - {data.content} <span><button className="btn btn-danger" type="button" onClick={()=> confirm('Are you sure want to delete this contact ?') ? deletePost(data.id) : ''}><span className="glyphicon glyphicon-trash"></span>   Delete</button>  <button className="btn btn-success" type="button" onClick={() => this.handleEditClick(data.id)}><span className="glyphicon glyphicon-edit"></span>   Edit</button></span></li>
      )
    }
  }
}

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
}

export default DataItem
