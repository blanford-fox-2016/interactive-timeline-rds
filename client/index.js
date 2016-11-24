import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Timeline from './containers/Timeline'
import configureStore from './store/index'

const store = configureStore()

render(
    <Provider store={store}>
        <Timeline data="" actions=""/>
    </Provider>,
    document.getElementById('root')
)