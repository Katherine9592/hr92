/*
用户信息获取：
   1：定义接口api
   2:在vuex中导入api
   3:在actions中定义方法获取用户信息存储到state
   4:在导航守卫中调用触发
*/

import router from '@/router'
import store from '@/store' // store===this.$store
const whitePage = ['/login', '/404']
// 需求：没登录不可进入首页等页面  ，登陆了就不可进入登陆页
/*
是否登录（有没有token）
     登录
         判断是否要去登陆页
              是:跳转到首页
              不：正常进入
     没登陆
        白名单：login 404
        判断要去的页面是不是白名单页面
             是：正常进入
             不：跳转到登陆页
*/
router.beforeEach(async(to, from, next) => {
  console.log('beforeEach')
  if (store.state.user.token) {
    if (to.path.toLowerCase() === '/login') {
      next('/')
    } else {
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
        // 再经过一次导航 守卫
        // next(to.path)===next({path:to.path,query:{},params:{}})
        // addRoutes添加的路由需要再经过一次导航守卫才可正常使用
        next(to)
        // this.$router.push('/xxx')====this.$router.push({path:'/xxx',query:{}})
      } else {
        next()
      }
    }
  } else {
    if (whitePage.includes(to.path.toLowerCase())) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  console.log('afterEach')
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})
