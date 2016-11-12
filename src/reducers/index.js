import { combineReducers } from 'redux'
import authenticate from './authenticate'
import tokens from './tokens'

export default combineReducers({ authenticate, tokens })
