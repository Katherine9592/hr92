import Vue from 'vue'

import 'normalize.css/normalize.css' // 抹平浏览器差异
/*
1：下载  npm i normalize.css
2:导入 import 'normalize.css'
*/
/*
移动端按需引入
pc全局引入
*/
import i18n from '@/lang'
// 引入 element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// 简写了什么？icons.js==>icons.vue===>icons文件夹（package.json,相关配制也对应上）=>icons文件夹/index.js===>icons/index.vue
import '@/permission' // 导航守卫

import '@/directives'

import UploadImg from '@/components/UploadImg'

import Print from 'vue-print-nb'
import AbcMixin from '@/mixins/xxx'
Vue.mixin(AbcMixin)

Vue.use(Print)
Vue.component('UploadImg', UploadImg)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 开发环境（development）与生产环境(production)都是mock的
// process.env.NODE_ENV：读取当前环境
// console.log(process.env.NODE_ENV)
// 生产环境使用mock
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
