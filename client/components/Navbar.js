import React, {Component, PropTypes} from 'react'

class Navbar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        searchInput: this.props.searchInput || ''
      }
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
                        <a className="navbar-brand" href="#">PhoneBook App</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        {/* <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/data">Data</Link></li>
                  <li><Link to="/datadate">Data Date</Link></li>
                </ul> */}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
