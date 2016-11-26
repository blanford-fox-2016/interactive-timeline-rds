import React, {Component, PropTypes} from 'react'

export default class AuthPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content || ''
        }
    }
    handleContentChange(e) {
        this.setState({content: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault()
        let content = this.state.content.trim()
        if (!content) {
            console.log('fail');
            return;
        } else {
            this.props.onSave(content)
            this.setState({content: ''})
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h2>Interactive Timeline with REDUX</h2>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form-body">
                                <ul className="nav nav-tabs final-login">
                                    <li className="active">
                                        <a data-toggle="tab" href="#sectionA">Login</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#sectionB">Register</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="sectionA" className="tab-pane fade in active">
                                        <div className="innter-form">
                                            <form className="sa-innate-form">
                                                <label>Username</label>
                                                <input type="text" name="username"/>
                                                <label>Password</label>
                                                <input type="password" name="password"/>
                                                <button type="submit">Sign In</button>
                                                <a href="">Forgot Password?</a>
                                            </form>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div id="sectionB" className="tab-pane fade">
                                        <div className="innter-form">
                                            <form className="sa-innate-form">
                                                <label>Name</label>
                                                <input type="text" name="name"/>
                                                <label>Username</label>
                                                <input type="text" name="username"/>
                                                <label>Email Address</label>
                                                <input type="email" name="email"/>
                                                <label>Password</label>
                                                <input type="password" name="password"/>
                                                <label>Avatar url</label>
                                                <input type="text" name="image_url"/>
                                                <button type="submit">Join now</button>
                                                <p>By clicking Join now, you agree to hifriends's User Agreement, Privacy Policy, and Cookie Policy.</p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
