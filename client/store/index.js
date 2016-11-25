import {createStore} from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialStateParameter){
  const store = createStore(rootReducer, initialStateParameter)

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
