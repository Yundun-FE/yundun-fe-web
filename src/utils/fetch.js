import request from './request'
import store from '@/store'

const headers = function() {
  return {
    'Authorization': `Bearer ${store.state.user.token}`
  }
}

export default {
  post(url, data, params) {
    return request({
      headers: headers(),
      url,
      method: 'POST',
      data,
      params
    })
  },

  delete(url, data, params) {
    return request({
      headers: headers(),
      url,
      method: 'DELETE',
      data,
      params
    })
  },

  put(url, data, params) {
    return request({
      headers: headers(),
      url,
      method: 'PUT',
      data,
      params
    })
  },

  patch(url, data, params) {
    return request({
      headers: headers(),
      url,
      method: 'PATCH',
      data,
      params
    })
  },

  get(url, params) {
    return request({
      headers: headers(),
      url,
      method: 'GET',
      params
    })
  }
}
