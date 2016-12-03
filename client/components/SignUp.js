import React, { Component } from 'react'
// import { connect } from 'react-redux'

export default class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      email: ''
    }
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

  handleSubmitRegister(e){
    e.preventDefault()
    var data_regis = {
      username: this.state.username.trim(),
      password: this.state.password.trim(),
      email: this.state.email.trim()
    }

    if(!data_regis.username || !data_regis.password || !data_regis.email){
      return
    }else{
      // $.post({
      //   url: "http://localhost:3000/api/users/",
      //   data: data_regis,
      //   success: function(new_user){
      //     localStorage.setItem('token', new_user.token)
      //
      //     if(getUser().username){
      //       this.props.router.replace('/dashboard')
      //     }
      //   }.bind(this)
      // })

      this.setState({
        username: '',
        password: ''
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
                <button type="submit" id="btn_register" className="btn btn-lg btn-success">Register</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

// export default connect()(SignUp)
