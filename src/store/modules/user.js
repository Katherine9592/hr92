// import { setToken, getToken } from '@/utils/auth'
import { sysProfile, sysUser } from '@/api/user'
import router, { otherRoutes, constantRoutes, resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    // token: getToken() || '',
    token: '',
    userInfo: {}
  },
  mutations: {
    SETTOKEN(state, value) {
      state.token = value
      // setToken(value)
    },
    SETUSERINFO(state, value) {
      state.userInfo = value
    },
    // 退出处理
    LOGOUT(state) {
      state.token = ''
      // setToken('')
      state.userInfo = ''
      resetRouter()
    }
  },
  actions: {
    setToken(ctx, value) {
      ctx.commit('SETTOKEN', value)
    },
    // 获取用户信息
    async getUserInfo(ctx) {
      const res = await sysProfile()
      const res2 = await sysUser(res.data.userId)
      /*
      对象合并:
         {...a,...b}
         Object.assign({},a,b,c,d....)
      */
      const res3 = Object.assign({}, res.data, res2.data)
      ctx.commit('SETUSERINFO', res3)
      // 获取用户信息后添加动态路由
      // otherRoutes:动态路由  [{meta:{name:'settings'}}...]
      // res3.roles.menus:权限数据 ['settings'...]
      const newArr = otherRoutes.filter((item) => {
        return res3.roles.menus.includes(item.meta.name)
      })
      // 添加匹配的路由
      newArr.push({ path: '*', redirect: '/404', hidden: true })
      router.addRoutes(newArr)

      // 菜单数据更新
      router.options.routes = [...constantRoutes, ...newArr]
      console.log('newArr', newArr)
    }
  }
}
