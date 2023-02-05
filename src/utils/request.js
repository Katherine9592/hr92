/*
1：下载axios
2:导入axios
3:创建axios副本（配制基地址之类）
4：创建请求拦截与响应拦截
5：暴露出去
6：导入使用
*/
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// Message===this.$message
const request = axios.create({
  // 本地接口不成功同学用
  // baseURL:'http://119.91.150.211:3000/api',
  // 本地接口成功的同学用
  // baseURL: 'http://127.0.0.1:3000/api'
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://127.0.0.1:3000/api'
  //     : 'http://119.91.150.211:3000/api'
  baseURL: process.env.VUE_APP_URL
  // baseURL: '/xxx'
})

/*
环境变量
  开发环境
     根目录创建一个文件.env.development文件
      VUE_APP_开头
      VUE_APP_NUM=1
  生产环境
     根目录创建一个文件.env.production文件
      VUE_APP_NUM=2
process.env.VUE_APP_NUM
*/

request.interceptors.request.use(
  (config) => {
    // 1:接口不需要token，你传了不报错  统一全加token   config.headers.Authorization = `Bearer ${store.state.user.token}`
    // 2:接口不需要token，你传了报错  在接口配制中加入一个参数让请求拦截知道是否要token,通过判断加token
    // console.log(config)
    // if (!config.noToken) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  // 成功：状态码2开头
  (res) => {
    if (res.data.success) {
      return res.data
    } else {
      // 错误提示
      Message.error(res.data.message)
      // 抛出错误，中断.then的执行，执行.catch
      return Promise.reject(new Error(res.data.message))
    }
  },
  // 失败：状态码非2开头
  (error) => {
    // token失效
    /*
1：判断状态码401时进入处理
2：提示一下
3：清空token,清空用户信息
4：跳转到登录页
*/
    if (error.response && error.response.status === 401) {
      Message.error(error.response.data.message)
      store.commit('user/LOGOUT')
      router.push('/login')
    }

    return Promise.reject(error)
    // return new Promise((resolve,reject)=>{
    //   reject(error)
    // })
  }
)
export default request
