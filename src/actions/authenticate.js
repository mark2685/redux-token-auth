export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'

export function authenticateStart () {
  return { type: AUTHENTICATE_ERROR }
}
export function authenticateComplete (user) {
  return { type: AUTHENTICATE_SUCCESS, user }
}
export function authenticateError (errors) {
  return { type: AUTHENTICATE_ERROR, errors }
}
