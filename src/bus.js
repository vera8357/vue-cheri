import Vue from 'vue'
// 掛載在vue的原型下
Vue.prototype.$bus = new Vue()

// errorMessage   觸發名稱         傳入訊息    對應bs樣式
// vm.$bus.$emit('message:push', '圖檔錯誤', 'success')

// loading整夜畫面  觸發名稱   true or false (開啟，關閉效果)
//   vm.$bus.$emit('loading', false)
