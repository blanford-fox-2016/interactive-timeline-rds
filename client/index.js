import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import configureStore from './store'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store  = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
