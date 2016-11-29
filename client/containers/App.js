import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListItem'
import Navbar from '../components/Navbar'
import FormAdd from '../components/FormAdd'
import AuthPage from '../components/AuthPage'

class App extends Component {
    render() {
        const {magicDataFromRedux, magicActionFromRedux, history} = this.props
        if (Auth.isUserAuthenticated()) {
          return (
              <div>
                  <Navbar data={magicDataFromRedux} history={history}/>
                  <div className="container">
                      <div className="row">
                          <div className="well text-center">
                              <h1>Interactive Timeline with REDUX</h1>
                          </div>
                      </div>
                      <FormAdd onSave={magicActionFromRedux.addPostProcess}/>
                      <ListItem data={magicDataFromRedux} actions={magicActionFromRedux} />
                  </div>
              </div>
          )
        } else {
          return (
            <AuthPage data={magicDataFromRedux} onLogin={magicActionFromRedux.loginProcess} onRegister={magicActionFromRedux.registerProcess} history={history}/>
          )
        }
    }
    componentDidMount() {
      this.props.magicActionFromRedux.loadPostProcess()
      // this.props.magicActionFromRedux.loadCommentProcess()
    }
}

App.propTypes = {
    magicDataFromRedux: PropTypes.array.isRequired,
    magicActionFromRedux: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
      magicDataFromRedux: state.data,
      history: history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        magicActionFromRedux: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
