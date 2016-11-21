import { Header } from 'isomorphic-fetch'
/**
 * TODO:
 * Implement getAuthHeaders
 * Implement  cacheAuthRequest
 * Implement  retryCachedRequests
 * Implement  failCachedRequests
 * Implement  isRefreshingTokens
 */

export default class AuthUtility {
  constructor(headers = {}) {
    this.headers = headers
  }
  static setBearerToken(headers, token) {
    return Object.assign({}, headers, {
      Authorization: `Bearer ${token}`
    })
  }
  set isRefreshingTokens(bool) {
    this._isRefreshingTokens = bool
  }
  get isRefreshingTokens() {
    return this._isRefreshingTokens
  }
  set accessToken(token) {
    this._accessToken = token
  }
  get accessToken() {
    return this._accessToken
  }
  set headers(headers) {
    this._headers = this.setBearerToken(headers, this.accessToken)
  }
  get headers() {
    return this._headers
  }
}
