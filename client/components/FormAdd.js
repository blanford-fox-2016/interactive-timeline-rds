import React, {Component, PropTypes} from 'react'

export default class FormAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name || '',
      phone: this.props.phone || ''
    }
  }
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handlePhoneChange(e) {
    this.setState({phone: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    let name = this.state.name.trim()
    let phone = this.state.phone.trim()
    if (!name || !phone) {
      return ;
    } else {
      this.props.onSave(name, phone)
      this.setState({name: '', phone: ''})
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" id="form-name" placeholder="Enter Name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" id="form-phone" placeholder="Enter Phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
        </div>
        <button className="btn btn-primary" type="submit"><span className="glyphicon glyphicon-plus"></span>   Add Contact</button>
      </form>
    )
  }
}

FormAdd.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onSave: PropTypes.func.isRequired
}
