import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import Retry from '@/utils/retry.js'

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
    return Promise.reject(error)
  }
)

const request = function(options) {
  return new Promise((resolve, reject) => {
    const retry = new Retry({
      timeout: 8000,
      interval: 200,
      max: 3,
      done: function(data) {
        resolve(data)
      },
      fail: function(err) {
        MessageBox.confirm('请刷新重试', '网络错误', {
          confirmButtonText: '刷新',
          type: 'warning',
          showCancelButton: false,
          center: true
        }).then(() => {
          location.reload()
        })
        reject(err)
      }
    })

    retry.start(async(done, retry) => {
      let data
      try {
        data = await service(options)
      } catch (error) {
        const { message } = error

        // 网络错误则重试
        if (message === 'Network Error') {
          retry()
        } else {
          Message({
            message,
            type: 'error',
            duration: 5 * 1000
          })
          done()
        }
      }
      done(data)
    })
  })
}

export default request
