import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers'

export default function configureStore(initialStateParameter) {
    const enhancer = compose(applyMiddleware(thunkMiddleware))
    const store = createStore(rootReducer, initialStateParameter, enhancer)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
