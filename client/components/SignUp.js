import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions'
import { Auth } from '../public/js/Auth'

class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      photo_URL: ''
    }
  }

  componentDidMount(){
    !Auth.getToken()
    ?
    this.props.router.replace('/signup')
    :
    this.props.router.replace('/dashboard')
  }

  handleUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  handlePhoto_URL(e){
    this.setState({
      photo_URL: e.target.value
    })
  }

  handleSubmitRegister(e){
    e.preventDefault()
    var data_regis = {
      username: this.state.username.trim(),
      password: this.state.password.trim(),
      email: this.state.email.trim(),
      photo_URL: this.state.photo_URL.trim()
    }

    if(!data_regis.username || !data_regis.password || !data_regis.email || !data_regis.photo_URL){

      return
    }else{
      this.props.router.replace('/')
      this.props.actions.onSignUp(data_regis)

      this.setState({
        username: '',
        password: '',
        email: '',
        photo_URL: ''
      })
    }
  }

  render(){
    return(
      <div>
          <div className="container">
            <form id="form_register" onSubmit={this.handleSubmitRegister.bind(this)}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={this.handleUsername.bind(this)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={this.handlePassword.bind(this)} />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" onChange={this.handleEmail.bind(this)} />
              </div>
              <div className="form-group">
                <label htmlFor="photo_URL">Photo URL</label>
                <input type="text" className="form-control" id="photo_URL" onChange={this.handlePhoto_URL.bind(this)} />
              </div>
              <div className="form-group">
                <button type="submit" id="btn_register" className="btn btn-lg btn-success">Register</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

SignUp.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(AppActions, dispatch)// penghubung reducers ke actions
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
