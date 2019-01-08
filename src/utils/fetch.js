import request from './request'
import { SERVER_URL } from '@/constants/server'
const base = SERVER_URL['explorer']

export default {
  post(url, data, params) {
    return request({
      url: base + url,
      method: 'POST',
      data,
      params
    })
  },

  delete(url, data, params) {
    return request({
      url: base + url,
      method: 'DELETE',
      data,
      params
    })
  },

  put(url, data, params) {
    return request({
      url: base + url,
      method: 'PUT',
      data,
      params
    })
  },

  get(url, params) {
    return request({
      url: base + url,
      method: 'GET',
      params
    })
  }
}
