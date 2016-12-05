import React, {Component, PropTypes} from 'react'
import DataTimeline from './DataTimeline'

export default class ListTimelines extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data_timelines, actions } = this.props
        // console.log(data_timelines);
        let dataNodes = data_timelines.map(function(item) {
            return (<DataTimeline key={item.id} data_timelines={item} {...actions}/>)
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
    data_timelines: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
