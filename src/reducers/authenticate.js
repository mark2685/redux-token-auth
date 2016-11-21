import {
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  SIGNOUT
} from '../actions/authActions'

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
        loading: true
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
    case REFRESH_TOKEN:
      return {
        ...state,
        loading: true
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true
      }
    case REFRESH_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        valid: false
      }
    case SIGNOUT:
      return {
        ...state,
        valid: false
      }
    default:
      return state
  }
}
