import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import * as AppActions from '../action'
// import ListItem from '../components/ListItem'
// import AppTextInput from '../components/AppTextInput'

class App extends Component {

    componentDidMount() {
        this.props.actions.loadPhoneBooks()
    }

    render() {
        const {data, actions} = this.props
        return(
            <div className="container">
                <div className="row">
                    aaa

                </div>
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {data: state.data}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(AppActions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
