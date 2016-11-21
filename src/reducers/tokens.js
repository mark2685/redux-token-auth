import {
  AUTHENTICATE_SUCCESS,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  SIGNOUT
} from '../actions/authActions'

const initialState = {
  accessToken: null,
  refreshToken: null,
  isRefreshing: false
}

export default function tokens (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isRefreshing: false
      }
    case REFRESH_TOKEN:
      return {
        ...state,
        isRefreshing: true
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isRefreshing: false
      }
    case REFRESH_TOKEN_ERROR:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isRefreshing: false
      }
    case SIGNOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      }
    default:
      return state
  }
}
