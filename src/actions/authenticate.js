export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'

export const authenticateStart = () => {
  return { type: AUTHENTICATE }
}
export const authenticateComplete = (user) => {
  return { type: AUTHENTICATE_SUCCESS, user }
}
export const authenticateError = (errors) => {
  return { type: AUTHENTICATE_ERROR, errors }
}
