import { createStore, applyMiddleware } from 'redux'
import api from '../middleware/api'
import reducers from '../reducers'

export default (preloadedState) => {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(api)
  )
}
