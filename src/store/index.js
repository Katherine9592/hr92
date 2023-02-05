import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import persistedstate from 'vuex-persistedstate'
/*
vuex持久化插件  vuex-persistedstate
1:下载  npm i vuex-persistedstate -f
2:导入 import persistedstate from 'vuex-persistedstate'
3：配制
   state
   mutations
   actions
   getters
   modules
   plugins:[persistedstate({paths:['需要持久化的数据','user:整个user模块持久化','user.token:只持久化token']})]
   默认是所有数据持久化
*/

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [persistedstate({ paths: ['user.token'] })]
  // 适用于小项目
})

export default store
