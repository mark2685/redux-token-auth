/* global describe it expect */

import reducer from './tokens'
import { SIGNOUT } from '../actions/authActions'

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
      accessToken: 'poP7CqUvh-56mFRJd1X4dCOhWN8RFmg9k37AfZTiTefRYcBCPNi41VkBne3',
      refreshToken: '1u98has;dfjaps9df8h9ppoP7CqUvh-56mFRJd1X4dCOhWN8RFmg9k37Af'
    }
    const action = {
      type: SIGNOUT
    }
    expect(reducer(initialState, action)).toEqual({
      accessToken: null,
      refreshToken: null
    })
  })
})
