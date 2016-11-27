import React, {Component, PropTypes} from 'react'

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name || '',
            email: this.props.email || '',
            username: this.props.username || '',
            password: this.props.password || ''
        }
    }


    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    setInputNull() {
        this.setState({
            name: '',
            email: '',
            username: '',
            password: ''
        })
    }


    handleSubmitRegister(e) {
        e.preventDefault()
        let name = this.state.name.trim()
        let email = this.state.email.trim()
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (!name || !email || !username || !password) {
            return
        }
        this.props.registerUser(name, email, username, password)
        this.setState({
            name: '',
            username: '',
            email: '',
            password: ''
        })
    }

    handleSubmitLogin(e) {
        e.preventDefault()
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (!username || !password) {
            return
        }
        this.props.loginUser(username, password)
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return(
            <div id="authPage" className="container">
                <div className="col-sm-6 col-sm-offset-3">
                    <ul className="nav nav-tabs">
                        <li onClick={this.setInputNull.bind(this)} className="active"><a data-toggle="tab" href="#login">Sign In</a></li>
                        <li onClick={this.setInputNull.bind(this)}><a data-toggle="tab" href="#register">Register</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="login" className="tab-pane fade in active">
                            <h3>Sign In</h3>
                            <form onSubmit={this.handleSubmitLogin.bind(this)}>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input value={this.state.password} onChange={this.handlePasswordChange.bind(this)} type="password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                        <div id="register" className="tab-pane fade">
                            <h3>Register</h3>
                            <form onSubmit={this.handleSubmitRegister.bind(this)}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input value={this.state.name} onChange={this.handleNameChange.bind(this)} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input value={this.state.email} onChange={this.handleEmailChange.bind(this)} type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input value={this.state.password} onChange={this.handlePasswordChange.bind(this)} type="password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Auth.propTypes = {
    // timeline: PropTypes.string,
    // onSave: PropTypes.func.isRequired
}