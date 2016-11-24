import {combineReducers} from 'redux'
import timelineReducers    from './reducers.timelines'

const rootReducer = combineReducers({
    timelineReducers: timelineReducers
})

export default rootReducer