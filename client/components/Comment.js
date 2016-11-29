import React, {Component, PropTypes} from 'react'

export default class Comment extends Component {
  constructor(props) {
    super(props)
  }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>User Comment Example</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <div className="thumbnail">
                            <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/></div>
                        </div>
                        <div className="col-sm-5">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <strong>myusername</strong>
                                    <span className="text-muted">commented 5 days ago</span>
                                </div>
                                <div className="panel-body">
                                    Panel content
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    )
                  }
                }
