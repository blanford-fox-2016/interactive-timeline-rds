import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions'
import { Auth } from '../public/js/Auth'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
      username: '',
      password: ''
    }
  }

  componentDidMount(){
    !Auth.getToken()
    ?
    this.props.router.replace('/login')
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

  handleSubmitLogin(e){
    e.preventDefault()
    var data_login = {
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }

    if(!data_login.username || !data_login.password){
      return
    }else{
      this.props.actions.onLogin(data_login)
      this.props.router.replace('/dashboard')
      this.setState({
        username: '',
        password: ''
      })
    }
  }

  render(){
    return(
      <div>
        <div className="container" onSubmit={this.handleSubmitLogin.bind(this)}>
          <form id="form_login">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" onChange={this.handleUsername.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" onChange={this.handlePassword.bind(this)} />
            </div>
            <div className="form-group">
              <button type="submit" id="btn_login" className="btn btn-lg btn-success">Login</button>
            </div>
            {this.state.error && (
              <p>Input is wrong</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}


Login.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(AppActions, dispatch)// penghubung reducers ke actions
  }
}

export default connect(null, mapDispatchToProps)(Login)
