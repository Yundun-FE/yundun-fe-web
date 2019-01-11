import qs from 'qs'
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
      // data: qs.stringify(data),
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
