import axios from 'axios'
import $ from 'jquery'

export default {
  // 預設 false 只有state 為模組區域變數 其他皆為全域變數
  // true actions mutationns getters 皆變為模組區域變數
  namespaced: true,
  state: {
    products: {},
    pagination: {},
    tempProduct: {},
    isNew: false,
    delProduct: {},
    upFileLoading: false
  },
  actions: {
    getProducts (context, page) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      context.commit('ISLOADING', true, {root: true})
      axios.get(api).then(res => {
        if (res.data.success) {
          context.commit('PRODUCTS', res.data.products)
          context.commit('PAGINATION', res.data.pagination)
          context.commit('ISLOADING', false, {root: true})
        }
      })
    },
    updatetemproduct (context, { isNew, item }) {
      $('#productModal').modal('show')
      if (isNew) {
        context.commit('ISNEW', isNew)
      } else {
        let date = Object.assign({}, item)
        context.commit('ISNEW', isNew)
        context.commit('TEMPPRODUCT', date)
      }
    },
    updatedProduct (context) {
      let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!context.state.isNew) {
        url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${context.state.tempProduct.id}`
        httpMethod = 'put'
      }
      axios[httpMethod](url, {data: context.state.tempProduct}).then(res => {
        if (res.data.success) {
          $('#productModal').modal('hide')
          context.dispatch('getProducts')
        }
      })
    },
    openDelModal (context, item) {
      item = Object.assign({}, item)
      context.commit('DELPRODUCT', item)
      $('#delModal').modal('show')
    },
    deleteProduct (context, productId) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${productId}`
      axios.delete(url).then(res => {
        if (res.data.success) {
          $('#delModal').modal('hide')
          context.dispatch('getProducts')
        }
      })
    },
    uploadFile (context, uploadedFile) {
      // 模擬傳統表單，並寫入欄位
      const fromData = new FormData()
      fromData.append('file-to-upload', uploadedFile)
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      context.commit('UPFILELOADING', true)
      axios.post(url, fromData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.success) {
          context.commit('TEMPPRODUCT', res.data.imageUrl)
          context.commit('UPFILELOADING', false)
        } else {
          let message = '圖檔錯誤'
          let status = 'success'
          context.commit('UPFILELOADING', false)
          context.dispatch('updateMessage', { message, status })
        }
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
    TEMPPRODUCT (state, payload) {
      if (typeof (payload) === 'string') {
        state.tempProduct.imageUrl = payload
      } else {
        state.tempProduct = payload
      }
    },
    ISNEW (state, payload) {
      state.isNew = payload
    },
    DELPRODUCT (state, payload) {
      state.delProduct = payload
    },
    UPFILELOADING (state, payload) {
      state.upFileLoading = payload
    }
  },
  getters: {
    products: state => state.products,
    pagination: state => state.pagination,
    tempProduct: state => state.tempProduct,
    isNew: state => state.isNew,
    delProduct: state => state.delProduct,
    upFileLoading: state => state.upFileLoading
  }
}
