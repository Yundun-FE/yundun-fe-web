import axios from 'axios'
import { MessageBox } from 'element-ui'
import Message from 'ant-design-vue/lib/message'
import Retry from './retry.js'
let networkError = false

const service = axios.create({
  baseURL: 'api',
  timeout: 15000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

// 拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response
    const { message, errors, code } = data
    // 正常返回
    if (status === 200) {
      if (message) {
        Message.warning(message)
        return Promise.reject(data)
      }
      return response.data
    } else {
      Message.error(message || '操作失败')
      return Promise.reject(data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

const request = function(options) {
  if (!options.url) return
  return new Promise((resolve, reject) => {
    const retry = new Retry({
      timeout: 8000,
      interval: 200,
      max: 3,
      done: function(data) {
        resolve(data)
      },
      fail: function(err) {
        if (networkError) {
          reject(err)
          return
        }

        MessageBox.confirm('请刷新重试', '网络错误', {
          confirmButtonText: '刷新',
          type: 'warning',
          showCancelButton: false,
          center: true
        })
          .then(() => {
            location.reload()
          })
          .catch(() => {})

        networkError = true
        reject(err)
      }
    })

    retry.start(async(done, retry) => {
      let data
      try {
        data = await service(options)
      } catch (error) {
        const { response } = error
        let message = error.message
        if (response && response.data) {
          console.log(response)
          const { message: mainMessage, errors } = response.data
          if (errors) {
            if (errors.length > 0) {
              message = errors[0].message || message
            } else {
              message = errors.message || message
            }
          } else {
            message = mainMessage || message
          }
        }

        // 网络错误则重试
        if (message === 'Network Error') {
          retry()
        } else {
          Message.error(message)
          reject(error)
        }
      }
      done(data)
    })
  })
}

export default request
