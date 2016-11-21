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
    this.cache = []

    this.headers = headers
  }
  set cache(cache = []) {
    this._cache = cache
  }
  get cache() {
    return this._cache
  }
  set isRefreshingTokens(bool) {
    this._isRefreshingTokens = bool
  }
  get isRefreshingTokens() {
    return this._isRefreshingTokens
  }
  set accessToken(token) {
    this._accessToken = token

    this.headers = Object.assign({}, this.headers, {
      Authorization: `Bearer ${token}`
    })
  }
  get accessToken() {
    return this._accessToken
  }
  set headers(headers = { 'Content-Type': 'application/json' }) {
    this._headers = headers
  }
  get headers() {
    return this._headers
  }
  cacheAction(request) {
    if (this.cache[request.url]) {
      this.cache[request.url] = request.url
      this.cache[request.url].push()
    }
    this.cache
  }
}
