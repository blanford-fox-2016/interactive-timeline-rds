import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './containers/App'
import configureStore from './store'

const store  = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
     <Route path="/" component={App}></Route>
   </Router>
  </Provider>,
  document.getElementById('root')
)
