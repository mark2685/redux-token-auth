import { AUTHENTICATE_CLEAR } from './authenticate'

import { CALL_API } from '../middleware/api'

const fetchSignOut = user => {
  return {
    [CALL_API]: {
      types: [AUTHENTICATE_CLEAR, AUTHENTICATE_CLEAR, AUTHENTICATE_CLEAR],
      url: 'http://dentalconnect.mouthful.la/api/account/logout',
      method: 'POST'
    }
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    return dispatch(fetchSignOut())
  }
}
