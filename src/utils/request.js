import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/',
  // baseURL: '/',
  timeout: 15000
})

// 拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response
    const { message, errors, code } = data
    // 正常返回
    if (status === 200) {
      if (message) {
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }

      if (errors || code > 0) return Promise.reject(data)
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
    const { message } = error
    console.log(JSON.stringify(error))
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
