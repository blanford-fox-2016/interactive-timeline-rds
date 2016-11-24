import React, {Component, PropTypes} from 'react'

export default class DataItem extends Component{
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

  handleEditClick() {
    this.setState({editing: true})
  }

  handleSaveEdit(e) {
    e.preventDefault()
    let name = this.state.name.trim()
    let phone = this.state.phone.trim()
    if(!name || !phone) {
      return
    }
    this.props.editData(this.props.data.id, name, phone)
    this.setState({editing: false})
  }

  render() {
    const {data, deleteData, editData} = this.props
    if(this.state.editing) {
      return (
        <form onSubmit={this.handleSaveEdit.bind(this)}>
          <input className="form-control" type="text" placeholder="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
          <input className="form-control" type="text" placeholder="phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)}/>
          <button className="btn btn-md btn-warning" type='sumbit'> Save</button>
        </form>
      )
    } else {
      return (
        <div className="well">
          {data.name} - {data.phone}
          <button className="btn btn-md btn-danger" type="button" onClick={() => confirm("are you want to delete?") === true ? deleteData(data.id) : false}>Delete</button>
          <button className="btn btn-md btn-warning" type="button" onClick={this.handleEditClick.bind(this)}>Edit</button>
        </div>
      )
    }
  }
}

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired
}
