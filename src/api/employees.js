import request from '@/utils/request'
// 获取员工列表
export const sysUser = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
// 新增员工
export const sysUserPost = (data) => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 删除员工
export const sysUserDelete = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}
// 导入员工
export const sysUserBatch = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
// 用户信息修改
export const sysUserPut = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 获取员工个人基础信息
export const employeesPersonalInfo = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
// 修改员工个人基础信息
export const employeesPersonalInfoPut = (data) => {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
// 岗位信息获取
export const employeesJobs = (id) => {
  return request({
    url: `/employees/${id}/jobs`
  })
}
// 岗位信息更新
export const employeesJobsPut = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
// 给员工分配角色
export const sysUserAssignRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
