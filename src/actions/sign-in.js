import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR } from './authenticate'

import { CALL_API } from '../middleware/api'

const fetchSignIn = user => {
  return {
    [CALL_API]: {
      types: [AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR],
      endpoint: '',
      method: 'POST',
      data: user
    }
  }
}

export const signIn = user => {
  return (dispatch, getState) => {
    return dispatch(fetchSignIn(user))
  }
}
