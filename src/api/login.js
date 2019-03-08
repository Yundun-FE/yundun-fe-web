import api from './index'
import axios from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  console.log(211)
  return {
    'message': '',
    'status': 200,
    'timestamp': 1534844188679,
    'body': {
      'password': '21232f297a57a5a743894a0e4a801fc3',
      'username': 'admin'
    },
    'result': {
      'id': '4291d7da9005377ec9aec4a71ea837f',
      'name': 'Robert Anderson',
      'username': 'admin',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }
  }
  // return axios({
  //   url: '/auth/login',
  //   method: 'post',
  //   data: parameter
  // })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
