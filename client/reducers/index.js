import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import timelineReducers from './reducers.timelines'
import commentReducers from './reducers.comments'
import authReducers from './reducers.auth'

const rootReducer = combineReducers({
    timelineReducers: timelineReducers,
    commentReducers: commentReducers,
    authReducers: authReducers,
    routing: routerReducer
})

export default rootReducer