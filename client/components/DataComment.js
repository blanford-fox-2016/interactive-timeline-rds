import React, { Component, PropTypes } from 'react'

export default class DataComment extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { comment } = this.props
    return(
      <div className="panel panel-default">
        <div className="panel-footer">
          <span>
            <h6>{comment.content}<br />
              Commented by : {comment.User.username}</h6>
          </span>
        </div>
      </div>
    )
  }
}

DataComment.propTypes = {
    comment: PropTypes.object.isRequired
}
