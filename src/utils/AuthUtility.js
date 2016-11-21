require('es6-promise')

import fetch from './fetch'

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
  cacheAuthAction(action) {
    action.types[0] = `${action.types[0]}_CACHE`
    this.cache.push(action)
  }
  clearCache() {
    this.cache = []
  }
  fetch(url, options) {
    if (!options.headers) {
      options.headers = this.headers
    }
    return fetch(url, options)
  }
}
