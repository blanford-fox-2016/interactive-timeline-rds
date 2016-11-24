import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListTimelines from '../components/ListTimelines'
import Navbar from '../components/Navbar'
import FormAddTimeline from '../components/FormAddTimeline'

class App extends Component {
  componentDidMount(){
    this.props.actions.loadTimelines() // dipanggil
  }
  render() {
      const {data, actions} = this.props
      return (
          <div>
              <Navbar/>
              <div className="container">
                  <FormAddTimeline onSave={actions.addTimeline}/>
                  <ListTimelines data={data} actions={actions}/>
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
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
