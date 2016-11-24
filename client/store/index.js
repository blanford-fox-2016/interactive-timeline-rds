import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(ReduxThunk)
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
