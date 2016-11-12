import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR } from './authenticate'

import { CALL_API } from '../middleware/api'

const fetchSignOut = user => {
  return {
    [CALL_API]: {
      types: [AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR],
      endpoint: '',
      method: 'POST'
    }
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    return dispatch(fetchSignOut())
  }
}
