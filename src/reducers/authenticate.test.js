/* global describe it expect */

import reducer from './authenticate'
import * as actions from '../actions/authActions'

describe('Authenticate reducer', () => {
  it('should have an initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      valid: false,
      errors: null
    })
  })

  it('should handle AUTHENTICATE action', () => {
    const action = {
      type: actions.AUTHENTICATE
    }
    expect(reducer(undefined, action)).toEqual({
      loading: true,
      valid: false,
      errors: null
    })
  })

  it('should handle AUTHENTICATE_ERROR action', () => {
    const action = {
      type: actions.AUTHENTICATE_ERROR
    }
    expect(reducer(undefined, action)).toEqual({
      loading: false,
      errors: 'Invalid token',
      valid: false
    })
  })

  it('should handle AUTHENTICATE_SUCCESS action', () => {
    const action = {
      type: actions.AUTHENTICATE_SUCCESS
    }
    expect(reducer(undefined, action)).toEqual({
      loading: false,
      valid: true,
      errors: null
    })
  })
})
