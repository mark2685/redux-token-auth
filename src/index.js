import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadState, syncLocalStorageWithStore } from './utils/storage'
import App from './App'
import './index.css'

const persistedState = loadState()
const store = configureStore(persistedState)

syncLocalStorageWithStore(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
