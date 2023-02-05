import request from '@/utils/request'

// 组织架构列表
export const companyDepartment = () => {
  return request({
    url: '/company/department'
  })
}
// 获取员工简单列表
export const sysUserSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}
// 新增部门
export const companyDepartmentPost = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
//  restful 增post  删delete(传参类似于get) 改put/patch  查get
// 删除部门
export const companyDepartmentDelete = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
// 编辑部门
export const companyDepartmentPut = (data) => {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
