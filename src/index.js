import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadState, syncLocalStorageWithStore } from './utils/storage'
import { refreshAuthToken } from './actions/authActions'
import App from './App'
import './index.css'

const persistedState = loadState()
const store = configureStore(persistedState)

syncLocalStorageWithStore(store)

// TODO: Find a more elegant way of doing this.
const { refreshToken } = store.getState().tokens
if (refreshToken) {
  store.dispatch(refreshAuthToken(refreshToken))
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
