import React, {Component, PropTypes} from 'react'
import {Auth} from '../public/scripts/token'

export default class AuthComponent extends Component {

    handleLogout() {
        Auth.deauthenticateUser()
        window.location = '/'
    }

    render() {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

AuthComponent.propTypes = {
    // timeline: PropTypes.string,
    // onSave: PropTypes.func.isRequired
}