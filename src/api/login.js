import request from '@/utils/request'
// 登录
export const sysLogin = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
