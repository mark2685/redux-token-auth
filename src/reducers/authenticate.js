import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR } from '../actions/authenticate'
import { SIGNOUT_SUCCESS, SIGNOUT_ERROR } from '../actions/sign-out'

const initialState = {
  loading: false,
  valid: false,
  errors: null
}

export default function authenticate (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        loading: true,
        valid: false,
        errors: null
      }
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
        errors: null
      }
    case AUTHENTICATE_ERROR:
      return {
        ...state,
        loading: false,
        valid: false,
        errors: 'Invalid token'
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: false,
        errors: null
      }
    case SIGNOUT_ERROR:
      return {
        ...state,
        loading: false,
        valid: false,
        errors: null
      }
    default:
      return state
  }
}
