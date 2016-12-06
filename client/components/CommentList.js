import React, {Component, PropTypes} from 'react'
import Comment from './Comment'

export default class CommentList extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const {data, editCommentProcess} = this.props
    let filteredData = data.Comments
    let commentNodes = filteredData.map(function(item) {
        return (<Comment key={item.id} data={item} editCommentProcess={editCommentProcess} postData={data}/>)
    })
    return (
      <div className="well">
        {commentNodes}
      </div>
    )
  }
}

CommentList.propTypes = {
  data: PropTypes.object.isRequired
}
