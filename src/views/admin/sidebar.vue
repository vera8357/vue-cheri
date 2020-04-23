<template>
  <div>
    <errorMessage></errorMessage>
    <ul class="nav justify-content-between flex-nowrap bg-secondary p-3">
      <li class="nav-item">
        <h1 class="Kalam-font line-hight text-white">Cheri</h1>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#" @click.prevent="checkout">登出</a>
      </li>
    </ul>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-2 bg-light">
          <ul class="nav flex-md-column text-left justify-content-around">
            <h6 class="d-none d-md-block px-3 mt-4 mb-1 text-muted">
              <small>
                <i class="fas fa-user-friends"></i> 管理員
              </small>
            </h6>
            <li class="nav-item" @click="list = 'products'">
               <router-link class="nav-link" to="/admin/products"
               :class="{'list-active' : list == 'products'}">
                <i class="fas fa-caret-right d-none d-md-inline-block"
                v-if="list == 'products'"></i> 產品列表
              </router-link>
            </li>
            <li class="nav-item" @click="list = 'orders'">
              <router-link class="nav-link" to="/admin/orders"
              :class="{'list-active' : list == 'orders'}">
                <i class="fas fa-caret-right d-none d-md-inline-block"
                v-if="list == 'orders'"></i> 訂單列表
              </router-link>
            </li>
            <li class="nav-item" @click="list = 'coupons'">
              <router-link class="nav-link" to="/admin/coupons"
              :class="{'list-active' : list == 'coupons'}">
                <i class="fas fa-caret-right d-none d-md-inline-block"
                v-if="list == 'coupons'"></i> 優惠卷
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-10 pt-2">
          <!-- 置換內容 -->
           <loading :active.sync="isLoading"></loading>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorMessage from '@/components/errorMessage'
export default {
  data () {
    return {
      list: ''
    }
  },
  methods: {
    checkout: function () {
      const url = `${process.env.APIPATH}/logout`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.$router.push('/')
        }
      })
    },
    getUrl: function () {
      this.list = this.$route.name.toLowerCase()
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    errorMessage
  },
  created () {
    let vm = this
    vm.getUrl()
  }
}
</script>

<style lang="scss" scoped>

h1 {
  margin: 0;
}
.col-md-2 {
  padding: 0;
}
</style>
