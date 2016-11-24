import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(thunk)
  )

  const store = createStore(rootReducer, initialState, enhancer)

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
