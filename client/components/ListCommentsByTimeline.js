import React, { Component, PropTypes } from 'react'
import DataComment from './DataComment'

export default class ListCommentsByTimeline extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { data_timelines } = this.props
    // console.log(data_timelines.Comments);
    let commentNodes = data_timelines.Comments.map(comment => {
      return(
        <DataComment key={comment.id} timelineId={data_timelines.id} comment={comment} />
      )
    })

    return(
      <div>
        {commentNodes}
      </div>
    )
  }
}

ListCommentsByTimeline.propTypes = {
    data_timelines: PropTypes.object.isRequired
}
