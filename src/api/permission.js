import request from '@/utils/request'

// 获取所有权限点
export const sysPermission = () => {
  return request({
    url: '/sys/permission'
  })
}
// 添加权限点
export const sysPermissionPost = (data) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 编辑权限点
export const sysPermissionPut = (data) => {
  return request({
    url: '/sys/permission/' + data.id,
    method: 'put',
    data
  })
}
// 删除权限点
export const sysPermissionDelete = (id) => {
  return request({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}
