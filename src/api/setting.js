import request from '@/utils/request'
// 获取角色列表
export const sysRole = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
// 新增角色
export const sysRolePost = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 删除角色
export const sysRoleDelete = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}
// 编辑角色
export const sysRolePut = (data) => {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

// 获取企业信息
export const company = (id) => {
  return request({
    url: '/company/' + id
  })
}

// 获取角色详情
export const sysRoleId = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export const sysRoleAssignPrem = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
