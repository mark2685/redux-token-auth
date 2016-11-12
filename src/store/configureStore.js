import { createStore, applyMiddleware } from 'redux'
import api from '../middleware/api'
import reducers from '../reducers'

const store = configureStore (preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(api)
  )
}

export default store
