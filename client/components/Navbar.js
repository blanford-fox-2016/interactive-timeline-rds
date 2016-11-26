import React, {Component, PropTypes} from 'react'

class Navbar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        searchInput: this.props.searchInput || ''
      }
    }
    handleLogout() {
      console.log('logout?');
      Auth.deauthenticateUser()
      this.props.history.go('/')
    }
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Interactive Timeline App</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse navbar-right">
                        {/* <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/data">Data</Link></li>
                  <li><Link to="/datadate">Data Date</Link></li>
                </ul> */}
                <button className="btn btn-primary raised" onClick={this.handleLogout.bind(this)}>Logout</button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
