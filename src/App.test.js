/* global it */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import authenticate from './reducers/authenticate'
import App from './App'

const store = createStore(authenticate)

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<Provider store={store}><App /></Provider>, div)
})
