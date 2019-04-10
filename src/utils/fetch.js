import request from './request'

export default {
  post(url, data, params) {
    return request({
      url,
      method: 'POST',
      data,
      params
    })
  },

  delete(url, data, params) {
    return request({
      url,
      method: 'DELETE',
      data,
      params
    })
  },

  put(url, data, params) {
    return request({
      url,
      method: 'PUT',
      data,
      params
    })
  },

  patch(url, data, params) {
    return request({
      url,
      method: 'PATCH',
      data,
      params
    })
  },

  get(url, params) {
    return request({
      url,
      method: 'GET',
      params
    })
  }
}
