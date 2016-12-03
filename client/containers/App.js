import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListTimelines from '../components/ListTimelines'
import Navbar from '../components/Navbar'
import FormAddTimeline from '../components/FormAddTimeline'

class App extends Component {
  componentDidMount(){
    this.props.actions.loadTimelines()
  }
  render() {
      const { data_timelines, children, actions } = this.props

      return (
          <div>
              <Navbar />
              {children}
          </div>
      )
  }
}
/*

<div className="container">
    <FormAddTimeline onSave={actions.addTimeline}/>
    <hr />
    <ListTimelines data_timelines={data_timelines} actions={actions} />
</div>
*/

App.propTypes = {
    data_timelines: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
      data_timelines: state.reducers_timelines
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)// penghubung reducers ke actions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
