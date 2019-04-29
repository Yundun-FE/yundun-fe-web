import Cookies from 'js-cookie'
import store from '@/store'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function authHeaders() {
  const token = store.state.user.token || Vue.ls.get(ACCESS_TOKEN)
  return {
    'Authorization': `Bearer ${token}`
  }
}
