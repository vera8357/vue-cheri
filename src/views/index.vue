<template>
  <div>
    <errorMessage></errorMessage>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container py-2" style="position: relative;">
        <div class="navLogo">
          <h1>
            <router-link class="Kalam-font" to="/home">Cheri</router-link>
          </h1>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ml-5 text-center" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/productList">商品列表</router-link>
            </li>
          </ul>
          <ul class="navbar-nav mr-auto lg-right">
            <li class="nav-item badge-wrap">
              <a class="nav-link" href="#">
                <i class="far fa-heart"></i>
                <span class="badge badge-pill badge-danger">{{likeNum}}</span>
              </a>
            </li>
            <li class="nav-item badge-wrap">
              <a class="nav-link" href="#" @click.prevent="openCartModal">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-pill badge-danger">{{shopingCart.carts.length}}</span>
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">後台登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 置換內容區塊 -->
    <main class="my-5">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <footer >
      <div class="flex-center footer">
        <div class="Kalam-font Kalam-size4">Cheri</div>
      </div>
      <div class="w-100 py-4">
        <div class="container">
          <div class="row my-3">
            <div class="col text-center foot-icon">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-instagram"></i>
              <i class="fas fa-envelope-open"></i>
              <i class="fab fa-line"></i>
            </div>
          </div>
          <div class="row">
            <div class="col text-center">本網站為單純作品練習，資料、圖片來源皆出自於網路。不使用於任何商業或營利行為</div>
          </div>
      </div>
      </div>
    </footer>
    <!-- 購物車跳窗 -->
    <div
      class="modal fade"
      id="cartModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center w-100">購物車</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="bg-light text-center p-5" v-if="shopingCart.carts.length == 0 ">
            <p>目前尚未選購商品!!</p>
          </div>
          <div v-else>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">品名</th>
                    <th scope="col">數量</th>
                    <th scope="col">金額</th>
                    <th class="text-center" scope="col">刪除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in shopingCart.carts" :key="item.id">
                    <th scope="row">{{item.product.title}}</th>
                    <td>{{item.qty}}</td>
                    <td>{{item.total}}</td>
                    <td class="text-center"><i class="fas fa-times" @click="delProduct(item)"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer" v-if="shopingCart.carts.length !== 0">
              <button type="button" class="btn btn-info w-100" @click="checkOut">結帳去</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import errorMessage from '@/components/errorMessage'
export default {
  data () {
    return {
      like: []
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    openCartModal () {
      $('#cartModal').modal('show')
    },
    delProduct (item) {
      this.$store.dispatch('delProduct', item)
      $('#cartModal').modal('hide')
    },
    checkOut () {
      $('#cartModal').modal('hide')
      this.$router.push('/checkOut')
    }
  },
  computed: {
    likeNum () {
      return this.like.length
    },
    shopingCart () {
      return this.$store.state.shopingCart
    }
  },
  components: {
    errorMessage
  },
  created () {
    let vm = this
    vm.getCart()
    if (localStorage.getItem('like')) {
      vm.like = JSON.parse(localStorage.getItem('like'))
    } else {
      vm.like = []
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #000;
  text-decoration: none;
}
.fa-shopping-cart,.fa-heart {
  font-size: 1.3rem;
}
.badge-wrap {
  position: relative;
}
.badge {
  position: absolute;
  bottom: 9px;
  right: 44%;
}
.footer::before,.footer::after{
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  margin: 0 2%;
  background-color: black;
}
.fa-times{
  cursor: pointer;
}
.fa-times:hover{
  color: rgb(185, 13, 13);
}
.foot-icon > i {
  display:inline-block;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 10px;
}
@media (min-width: 768px) {
  .badge {
    right: 46%;
  }
}

//最小992 992以上
@media (min-width: 992px) {
  .lg-right {
    position: absolute;
    right: 0px;
  }
  .badge {
    right: -2px;
  }
}
</style>
