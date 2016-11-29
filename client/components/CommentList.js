import React, {Component, PropTypes} from 'react'
import Comment from './Comment'

export default class CommentList extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const {data} = this.props
    let filteredData = data
    let commentNodes = filteredData.map(function(item) {
      console.log('item': item);
        return (<Comment data={data}/>)
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
