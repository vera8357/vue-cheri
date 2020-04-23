// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 外部引入插件
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

// 內部文件
import store from './store'
import router from './router'
import App from './App'
import './bus'
import currency from '@/filters/currency'
import changeTime from '@/filters/changeTime'
// 全域註冊filter
Vue.filter('currency', currency)
Vue.filter('changeTime', changeTime)
// 前端把cookie打開
axios.defaults.withCredentials = true
// 全域啟用loading元件
Vue.component('Loading', Loading)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  i18n
})
// to-即將要進入的目標, from-正要離開的路由, next
router.beforeEach((to, from, next) => {
  if (to.meta.requiredUser) {
    const url = `${process.env.APIPATH}/api/user/check`
    axios.post(url).then(res => {
      if (res.data.success) {
        next()
      } else {
        alert('請重新登入')
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
