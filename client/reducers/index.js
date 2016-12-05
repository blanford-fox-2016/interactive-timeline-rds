import {combineReducers} from 'redux'
import reducers_timelines from './reducers.timelines'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  reducers_timelines,
  routing: routerReducer
})

export default rootReducer
