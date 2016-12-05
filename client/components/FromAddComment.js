import React, { Component, PropTypes } from 'react'

export default class FromAddComment extends Component {
  constructor(props){
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleCommentChange(e){
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmitComment(e){
    e.preventDefault()
    let comment = this.state.comment.trim()
    if(!comment){
      return
    }else{
      // console.log(this.props.data_user);
      this.props.onCommentSubmit(this.props.data_timelines.id, comment, this.props.data_user)
      this.setState({
        comment: ''
      })
    }
  }
  render(){
    return(
      <form onSubmit={this.handleSubmitComment.bind(this)}>
        <div className="form-group">
          <input type="text" value={this.state.comment} className="form-control" placeholder="Write a comment" onChange={this.handleCommentChange.bind(this)} />
        </div>
      </form>
    )
  }
}

FromAddComment.propTypes = {
  data_timelines: PropTypes.object.isRequired
}
