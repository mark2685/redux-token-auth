import Promise from 'es6-promise'
import fetch from './fetch'
/**
 * TODO:
 * Implement getAuthHeaders
 * Implement  cacheAuthRequest
 * Implement  retryCachedRequests
 * Implement  failCachedRequests
 * Implement  isRefreshingTokens
 */

export default class AuthUtility {
  constructor({ headers, cache }) {
    this.cache = cache

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
  set refreshToken(token) {
    this._refreshToken = token
  }
  get refreshToken() {
    return this._refreshToken
  }
  set tokens({ accessToken, refreshToken }) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
  get tokens() {
    return Object.assign({}, {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    })
  }
  set headers(headers = { 'Content-Type': 'application/json' }) {
    this._headers = headers
  }
  get headers() {
    return this._headers
  }
  cacheAction(url, options) {
    if (this.cache[url]) {
      this.cache[url] = url
    }

    this.cache[url].push({ url, options })
  }
  cacheAuthRequest(url, options) {
    if (this.cache[url]) {
      this.cache[url] = url
    }

    this.cache[url].push({ url, options })
  }
  fetch(url, options) {
    return new Promise((resolve, reject) => {
      if (!options.headers) {
        options.headers = this.headers
      }
      return fetch(url, options)
        .then(response => resolve, reason => {
          if (reason.response.status === 401) {
            this.cacheAuthRequest(url, options)
          }
          reject(reason)
        })
    })
  }
  refetchCachedRequests(calback) {
    this.cache.forEach(req => {
      this.fetch(req.url, req.options)
    })
  }
  failCachedRequests(callback) {
    this.cache.forEach(req => {
      next
    })
  }
}
