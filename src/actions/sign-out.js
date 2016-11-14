export const SIGNOUT = 'SIGNOUT'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
export const SIGNOUT_ERROR = 'SIGNOUT_ERROR'

import { CALL_API } from '../middleware/api'

const fetchSignOut = user => {
  return {
    [CALL_API]: {
      types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_ERROR],
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
