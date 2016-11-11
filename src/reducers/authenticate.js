import * as actions from '../actions/authenticate'

const initialState = {
  loading: false,
  valid: false,
  errors: null
}

export default function authenticate (state = initialState, action) {
  switch (action.type) {
    case actions.AUTHENTICATE:
      return {
        ...state,
        loading: true,
        valid: false,
        errors: null
      }
    case actions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
        errors: null
      }
    case actions.AUTHENTICATE_ERROR:
      return {
        ...state,
        loading: false,
        errors: 'Invalid token',
        valid: false
      }
    default:
      return state
  }
}
