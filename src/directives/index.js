// 全局自定义指令
import Vue from 'vue'

const dirs = {
  hmxxx: {},
  hmooo: {},
  xxx: {},
  errorimg: {
    inserted(dom, obj, vnode) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
      dom.onerror = () => {
        dom.src = obj.value || require('@/assets/common/head.jpg')
      }
    },
    componentUpdated(dom, obj, vnode) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
    }
  }
}

// 循环对象  for in
// for (const key in dirs) {
//   Vue.directive(key, dirs[key])
// }
// 数组循环:将对象转换成数组
/*
  Object.keys({a:1,b:2})===['a','b']
  Object.values({a:1,b:2})===[1,2]
  Object.entries({a:1,b:2})===[['a',1],['b',2]]
*/
// Object.keys(dirs).forEach((key) => {
//   Vue.directive(key, dirs[key])
// })
Object.entries(dirs).forEach((item) => {
  Vue.directive(item[0], item[1])
})
