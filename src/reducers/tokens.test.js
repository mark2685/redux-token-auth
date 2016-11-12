/* global describe it expect */

import reducer from './tokens'
import * as actions from '../actions/authenticate'

describe('Tokens reducer', () => {
  it('should have an initial state', () => {
    expect(reducer(undefined, {})).toBeDefined()
  })

  it('should have an `accessToken` property set to null on initial state', () => {
    const state = reducer(undefined, {})
    expect(state.accessToken).toBe(null)
  })

  it('should have an `refreshToken` property set to null on initial state', () => {
    const state = reducer(undefined, {})
    expect(state.refreshToken).toBe(null)
  })

  it('should handle AUTHENTICATE_CLEAR', () => {
    const initialState = {
      accessToken: '91u23-0129u3-f09jawef',
      refreshToken: '1u98has;dfjaps9df8h9p'
    }
    const action = {
      type: actions.AUTHENTICATE_CLEAR
    }
    expect(reducer(initialState, action)).toEqual({
      accessToken: null,
      refreshToken: null
    })
  })
})
