import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // baseURL: 'http://api.17disney.com/',
  baseURL: '/',
  timeout: 15000
})

// 拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response
    const { message, errors } = data
    // 正常返回
    if (status === 200) {
      if (message) {
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      if (errors) return Promise.reject(data)
      return response.data
    } else {
      Message({
        message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(data)
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
