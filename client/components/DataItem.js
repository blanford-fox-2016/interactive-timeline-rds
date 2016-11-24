import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      name: this.props.data.name || '',
      phone: this.props.data.phone || ''
    }
  }
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handlePhoneChange(e) {
    this.setState({phone: e.target.value})
  }
  handleEditClick(){
    this.setState({editing: true})
  }
  handleSaveEdit(e) {
    e.preventDefault()
    let name = this.state.name.trim()
    let phone = this.state.phone.trim()
    if (!name || !phone) {
      return ;
    } else {
      this.props.editData(this.props.data.id, name, phone)
      this.setState({editing: false})
    }
  }
  render() {
    const {data, deleteData, editData} = this.props
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSaveEdit.bind(this)}>
          <div className="form-group">
            <label>Edit Name</label>
            <input type="text" className="form-control" id="form-name" placeholder="Enter Name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Edit Phone</label>
            <input type="text" className="form-control" id="form-phone" placeholder="Enter Phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
          </div>
          <button className="btn btn-success" type="submit"><span className="glyphicon glyphicon-plus"></span>   Edit Contact</button>
        </form>
      )
    } else {
      return (
        <li className="list-group-item">{data.name} - {data.phone} <span><button className="btn btn-danger" type="button" onClick={()=> confirm('Are you sure want to delete this contact ?') ? deleteData(data.id) : ''}><span className="glyphicon glyphicon-trash"></span>   Delete</button>  <button className="btn btn-success" type="button" onClick={() => this.handleEditClick(data.id)}><span className="glyphicon glyphicon-edit"></span>   Edit</button></span></li>
      )
    }
  }
}

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired
}

export default DataItem
