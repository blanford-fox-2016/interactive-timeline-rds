import React, {Component, PropTypes} from 'react'

export default class Auth extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         timeline: this.props.timeline || ''
    //     }
    // }
    //
    // handleTimelineChange(e) {
    //     this.setState({
    //         timeline: e.target.value
    //     })
    // }
    //
    // handleSubmit(e) {
    //     e.preventDefault()
    //     let timeline = this.state.timeline.trim()
    //     if (!timeline) {
    //         return
    //     }
    //     this.props.onSave(1,timeline)
    //     this.setState({
    //         timeline: ''
    //     })
    // }

    render() {
        return(
            <div id="authPage" className="container">
                <div className="col-sm-6 col-sm-offset-3">
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#login">Sign In</a></li>
                        <li><a data-toggle="tab" href="#register">Login</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="login" className="tab-pane fade in active">
                            <h3>Sign In</h3>
                            <form>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                        <div id="register" className="tab-pane fade">
                            <h3>Register</h3>
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" />
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