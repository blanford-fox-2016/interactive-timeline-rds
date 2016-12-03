import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions'
import ListTimelines from './ListTimelines'
import FormAddTimeline from './FormAddTimeline'
import { Auth } from '../public/js/Auth'

class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    Auth.getToken()
    ?
    this.props.actions.loadTimelines()
    :
    console.log(this.props.router);
    this.props.router.replace('/login')
  }

  render() {
      const { data_timelines, children, actions } = this.props

      return (
          <div>
            <div className="container">
                <FormAddTimeline onSave={actions.addTimeline}/>
                <hr />
                <ListTimelines data_timelines={data_timelines} actions={actions} />
            </div>
          </div>
      )
  }
}

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
