import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import Auth from '../components/Auth'
import { Link, browserHistory } from 'react-router'

class AuthContainer extends Component {

    render() {
        const {timelineReducers, actions} = this.props
        // console.log("Dari timeline: ", commentReducers)

        return(
            <div>
                <Auth loginUser={actions.loginUser} registerUser={actions.registerUser} />
            </div>
        )
    }
}



AuthContainer.propTypes = {
    timelineReducers: PropTypes.array.isRequired,
    // commentReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        timelineReducers: state.timelineReducers,
        // commentReducers: state.commentReducers
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(AppActions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthContainer)

