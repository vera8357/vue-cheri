import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import adminProductModules from './adminProducts'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true, // 嚴禁模式
  state: {
    // 後台 共用
    isLoading: false,
    messages: [],
    // 前台 購物車
    shopingCart: [],
    collect: []
  },
  actions: {
    //   後台 共用
    updateLoading (context, status) {
      context.commit('ISLOADING', status)
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGES', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('MESSAGES', {i})
          }
        })
      }, 5000)
    },
    removeMessage (context, i) {
      context.commit('MESSAGES', { i })
    },
    // 前台 購物車
    getCart (context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      axios.get(url).then(res => {
        context.commit('SHOPINGCART', res.data.data)
      })
    },
    addToCart (context, cart) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      axios.post(url, {data: cart}).then(res => {
        if (res.data.success) {
          let message = '已加入購物車'
          let status = 'success'
          context.dispatch('updateMessage', { message, status })
          context.dispatch('getCart')
        }
      })
    },
    delProduct (context, item) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`
      axios.delete(url).then(res => {
        if (res.data.success) {
          let message = '已刪除此商品'
          let status = 'success'
          context.dispatch('updateMessage', { message, status })
          context.dispatch('getCart')
        }
      })
    },
    collect (context) {
      let like = localStorage.getItem('like') === null ? [] : JSON.parse(localStorage.getItem('like'))
      context.commit('COLLECT', like)
    },
    updateCollect (context, { id, title }) {
      let items = localStorage.getItem('like') === null ? [] : JSON.parse(localStorage.getItem('like'))
      let data = false
      items.forEach(function (ele, index) {
        if (ele.id === id) {
          data = index
        }
      })
      if (data === false) {
        let item = {
          id,
          title
        }
        items.push(item)
      } else {
        items.splice(data, 1)
      }
      localStorage.setItem('like', JSON.stringify(items))
      context.dispatch('collect')
    },
    delAllCollect (context) {
      localStorage.removeItem('like')
      context.dispatch('collect')
    }
  },
  mutations: {
    //   後台 共用
    ISLOADING (state, payload) {
      state.isLoading = payload
    },
    MESSAGES (state, {message, status, timestamp, i}) {
      if (i === undefined) {
        state.messages.push({
          message,
          status,
          timestamp
        })
      } else {
        state.messages.splice(i, 1)
      }
    },
    // 前台
    SHOPINGCART (state, payload) {
      state.shopingCart = payload
    },
    COLLECT (state, payload) {
      state.collect = payload
    }
  },
  modules: {
    adminProductModules
  }
})
