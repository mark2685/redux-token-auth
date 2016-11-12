import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore({})

// import { createStore, combineReducers } from 'redux'
import authenticate from './reducers/authenticate'
import App from './App'
import './index.css'

// const reducers = combineReducers({ authenticate })

// const store = createStore(reducers)

render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
