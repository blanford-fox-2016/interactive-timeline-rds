import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListTimeline'
import FormTimeline from '../components/FormTimeline'

class Timeline extends Component {

    componentDidMount() {
        this.props.actions.loadTimelines()
    }

    render() {
        const {timelineReducers, actions} = this.props
        return(
            <div className="container">

                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="jumbotron text-center">
                            <h3>Interactive Timeline RDS</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <FormTimeline onSave={actions.addTimeline}/>
                    </div>
                </div>
                
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

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(AppActions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline)

