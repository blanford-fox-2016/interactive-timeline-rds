
import React, {Component, PropTypes} from 'react'
import DataTimeline from './DataTimeline'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        const {timelineReducers, actions} = this.props

        console.log("dari listtimeine: ", timelineReducers)

        let timelineNodes = timelineReducers.map(function (item) {
            console.log("ini item: ", item)
            return(
                <DataTimeline key={item.id} timelineReducers={item} {...actions} />
            )
        })
        return(
            <div>
                {timelineNodes}
            </div>
        )
    }
}

ListItem.propTypes = {
    timelineReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}