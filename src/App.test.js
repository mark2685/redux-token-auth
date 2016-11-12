/* global it */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'

const store = configureStore({})

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<Provider store={store}><App /></Provider>, div)
})
