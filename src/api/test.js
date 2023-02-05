import request from '@/utils/request'
export const sysLogin = () => {
  return request({
    url: '/sys/login',
    method: 'post',
    noToken: true,
    data: {
      mobile: '13800000002',
      password: '123456'
    }
  })
}
