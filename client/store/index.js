import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState){

  const logger = ReduxLogger()

  const enhancer = compose(
    applyMiddleware(ReduxThunk, logger)
  )

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
