import React, {Component, PropTypes} from 'react'
import DataTimeline from './DataTimeline'

export default class ListTimelines extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {data, actions} = this.props

        let dataNodes = data.map(function(item) {
            return (<DataTimeline key={item.id} data={item} {...actions}/>)
        })
        return (
          <div>
            <div>
                {dataNodes}
            </div>
            <hr />
          </div>
        )
    }
}

ListTimelines.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
