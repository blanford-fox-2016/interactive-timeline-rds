import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListItem'
import AppTextInput from '../components/AppTextInput'

class App extends Component{
  componentDidMount() {
    this.props.actions.loadPhoneBooks();
  }

  render(){
    const {data, actions} = this.props
    return (
      <div>
        <h1 className="jumbotron">React Hacktiv8</h1>
        <AppTextInput onSave={actions.addPhoneBook} />
        <ListItem data={data} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {data: state.data}
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(AppActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
