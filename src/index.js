import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadState, syncLocalStorageWithStore } from './utils/local-storage'
import { refreshToken } from './actions/auth-action'
import App from './App'
import './index.css'

const persistedState = loadState()
const store = configureStore(persistedState)

syncLocalStorageWithStore(store)

// TODO: Find a more elegant way of doing this.
const state = store.getState()
if (state.tokens && state.tokens.accessToken) {
  store.dispatch(refreshToken(state.tokens.refreshToken))
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
