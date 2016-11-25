
import React, {Component, PropTypes} from 'react'
import DataComment from './DataComment'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const {commentReducers, actions} = this.props

        let arrComment = commentReducers ? commentReducers : []
        const commentNodes = arrComment.map(function (item) {
            return(
                <DataComment key={item.id} commentReducers={item} {...actions} />
            )
        })


        return(
            <div>
                {commentNodes}
            </div>
        )
    }
}

ListItem.propTypes = {
    commentReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}