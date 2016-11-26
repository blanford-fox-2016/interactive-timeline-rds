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
        const {magicDataFromRedux, magicActionFromRedux} = this.props
        console.log('Auth', Auth);
        if (Auth.isUserAuthenticated()) {
          return (
              <div>
                  <Navbar/>
                  <div className="container">
                      <div className="row">
                          <div className="well text-center">
                              <h1>Interactive Timeline with REDUX</h1>
                          </div>
                      </div>
                      <FormAdd onSave={magicActionFromRedux.addPostProcess}/>
                      <ListItem data={magicDataFromRedux} actions={magicActionFromRedux}/>
                  </div>
              </div>
          )
        } else {
          return (
            <AuthPage onLogin={magicActionFromRedux} onRegister={magicActionFromRedux}/>
          )
        }
    }
    componentDidMount() {
      console.log('component mounted');
      console.log('props app: ', this.props);
      this.props.magicActionFromRedux.loadPostProcess()
    }
}

App.propTypes = {
    magicDataFromRedux: PropTypes.array.isRequired,
    magicActionFromRedux: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {magicDataFromRedux: state.data}
}

function mapDispatchToProps(dispatch) {
    return {
        magicActionFromRedux: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
