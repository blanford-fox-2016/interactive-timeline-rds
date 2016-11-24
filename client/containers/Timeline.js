import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadTimelines} from '../actions'
import ListItem from '../components/ListTimeline'

class Timeline extends Component {

    componentDidMount() {
        this.props.loadTimelines()
    }

    render() {
        const {timelineReducers, actions} = this.props
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <ListItem timelineReducers={timelineReducers} actions={actions}/>
                    </div>
                </div>
            </div>
        )
    }
}



Timeline.propTypes = {
    timelineReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {timelineReducers: state.timelineReducers}
}

// function mapDispatchToProps(dispatch) {
//     return {actions: bindActionCreators(loadTimelines, dispatch)}
// }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTimelines: loadTimelines
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline)

