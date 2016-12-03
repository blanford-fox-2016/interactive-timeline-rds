import React, { Component } from 'react'
// import { connect } from 'react-redux'

export default class Login extends Component {
  constructor(){
    super()
    this.state = {
      error: false,
      username: '',
      password: ''
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

  handleSubmitLogin(e){
    e.preventDefault()
    var data_login = {
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }

    // if(!data_login.username || !data_login.password){
    //   return
    // }else{
    //   $.post({
    //     url: "http://localhost:3000/api/users/login",
    //     data: data_login,
    //     success: function(login_user){
    //       localStorage.setItem('token', login_user.token)
    //       // this.setState({
    //       //   token: login_user.token
    //       // })
    //       if(getUser().username){
    //         this.props.router.replace('/dashboard')
    //       }else{
    //         alert('input is wrong')
    //         this.setState({
    //           username: '',
    //           password: '',
    //           error: true,
    //           token: ''
    //         })
    //         this.props.router.replace('/login')
    //       }
    //     }.bind(this)
    //   })

      this.setState({
        username: '',
        password: ''
      })
    // }
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

// export default connect(Home)
