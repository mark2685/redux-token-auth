import { CALL_API } from '../middleware/api'
import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR } from './authenticate'

const fetchSignIn = user => {
	return {
		[CALL_API]: {
			types: [AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR],
			url: 'http://dentalconnect.mouthful.la/api/account/login',
			method: 'POST',
			data: user
		}
	};
}

export const signIn = user => {
	return (dispatch, getState) => {
		return dispatch(fetchSignIn(user))
	}
}
