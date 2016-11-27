// import 'babel-polyfill'
// import React from 'react'
// import {render} from 'react-dom'
// import {Provider} from 'react-redux'
// import Timeline from './containers/Timeline'
// import configureStore from './store/index'
//
// const store = configureStore()
//
// render(
//     <Provider store={store}>
//         <Timeline data="" actions=""/>
//     </Provider>,
//     document.getElementById('root')
// )





import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, Link, browserHistory} from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Timeline from './containers/Timeline'
import AuthContainer from './containers/AuthContainer'
import configureStore from './store/index'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Timeline} />
            <Route path="/login" component={AuthContainer}/>
        </Router>

    </Provider>,
    document.getElementById('root')
)