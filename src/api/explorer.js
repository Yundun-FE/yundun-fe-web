import request from '@/utils/request'

// const base = 'http://localhost:7601'
const base = 'explorer-service'

export default {
  productCreate: function productCreate(data) {
    return request({
      url: `${base}/products`,
      method: 'post',
      data
    })
  },

  productDelete: function productDelete(id) {
    return request({
      url: `${base}/products/${id}`,
      method: 'delete'
    })
  },

  productUpdate: function productUpdate(id, data) {
    return request({
      url: `${base}/products/${id}`,
      method: 'put',
      data
    })
  },

  productList: function productList(data) {
    return request({
      url: `${base}/products`,
      method: 'post',
      data
    })
  },

  jobCreate: function jobCreate(data) {
    return request({
      url: `${base}/jobs`,
      method: 'post',
      data
    })
  },

  jobDelete: function jobDelete(id) {
    return request({
      url: `${base}/jobs/${id}`,
      method: 'delete'
    })
  },

  jobUpdate: function jobUpdate(id, data) {
    return request({
      url: `${base}/jobs/${id}`,
      method: 'put',
      data
    })
  },

  jobList: function jobList(data) {
    return request({
      url: `${base}/jobs`,
      method: 'get',
      data
    })
  }
}
