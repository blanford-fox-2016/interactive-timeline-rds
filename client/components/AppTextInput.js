import React, {Component, PropTypes} from 'react'

export default class AppTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : this.props.name || '',
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
    if(!name || !phone) {
      return;
    }
    this.props.onSave(name, phone)
    this.setState({name: '', phone: ''})
  }

  render () {
    return (
    <div className="container">
      <h2>Input</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input className="form-control" type="text" placeholder="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        <input className="form-control" type="textarea" placeholder="comment" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
        <button className="btn btn-md btn-primary"type='sumbit'> Post Timeline</button>
      </form>
    </div>
    )
  }
}

AppTextInput.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onSave: PropTypes.func.isRequired
}
