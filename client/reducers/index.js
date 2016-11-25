import {combineReducers} from 'redux'
import timelineReducers    from './reducers.timelines'
import commentReducers    from './reducers.comments'

const rootReducer = combineReducers({
    timelineReducers: timelineReducers,
    commentReducers: commentReducers
})

export default rootReducer