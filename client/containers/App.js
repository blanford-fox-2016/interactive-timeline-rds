import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' //hubungin react sm redux
import * as AppActions from '../actions' 
import ListItem from '../components/ListItem'
import AppTextInput from '../components/AppTextInput'

class App extends Component {
  componentDidMount() {
    this.props.actions.loadTimeline()
  }

  render(){
    const {data, actions} = this.props
    return(
        <div className="container">
          <div className="row">
            <div className="jumbotron">
            <div className="container">
            <div className="text-center">
              <h1>My Timeline</h1>
            </div>
            <div>
              <AppTextInput onSave={actions.addPost}/>
            </div>
            </div>
          </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ListItem data={data} actions={actions}/>
            </div>
          </div>
        </div>
          
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {data: state.data}
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
