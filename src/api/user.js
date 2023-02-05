import request from '@/utils/request'
// import store from '@/store'

// 获取用户信息
export const sysProfile = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取员工头像等信息
export const sysUser = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}
