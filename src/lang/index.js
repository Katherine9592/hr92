// vue-i18n基本使用
// 1:下载
// 2：导入
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import hmzh from './hmzh'
import hmen from './hmen'
import zh from './zh'
import en from './en'
//  3:注册
import Vue from 'vue'
import jsCookie from 'js-cookie'
Vue.use(VueI18n)
// 4:实例化
const i18n = new VueI18n({
  // locale:'en:英文/zh:中文'
  // 持久化  1：值修改了存储到浏览器  2：初始值读取浏览器存储
  locale: jsCookie.get('lang') || 'en',
  // messages语言包
  messages: {
    en: {
      message: 'hello',
      ...enLocale,
      ...hmen,
      ...en
    },
    zh: {
      message: '你好',
      ...zhLocale,
      ...hmzh,
      ...zh
    },
    xxx: {}
  }
})
// 暴露
export default i18n

// 使用
/*
vue文件中使用：
   显示内容: {{$t('语言包内的key')}}
   切换语言：this.$i18n.locale='语言标识'
js文件
   import i18n from '@/lang'  i18n===this.$i18n
   显示内容  i18n.t('语言包内的key')
   切换语言  i18n.locale='语言标识'
*/
