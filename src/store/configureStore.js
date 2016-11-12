import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import reducers from '../reducers'

export default (preloadedState) => {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger())
    )
  )
}
