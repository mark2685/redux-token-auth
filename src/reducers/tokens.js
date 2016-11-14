import { AUTHENTICATE_SUCCESS } from '../actions/authenticate'
import { SIGNOUT_SUCCESS, SIGNOUT_ERROR } from '../actions/sign-out'

const initialState = {
  accessToken: null,
  refreshToken: null
}

export default function tokens (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      }
    case SIGNOUT_ERROR:
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      }
    default:
      return state
  }
}
