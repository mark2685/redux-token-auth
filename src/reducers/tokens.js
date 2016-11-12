import * as actions from '../actions/authenticate'

const initialState = {
  accessToken: null,
  refreshToken: null
}

export default function tokens (state = initialState, action) {
  switch (action.type) {
    case actions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    case actions.AUTHENTICATE_CLEAR:
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      }
    default:
      return state
  }
}
