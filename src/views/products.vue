<template>
  <div>
    <div class="row">
      <div class="col-12">
        <ul class="nav justify-content-center flex-nowrap">
          <li class="nav-item" @click.prevent="category = 'all'" :class="{'current' : category == 'all'}">
            <a class="nav-link" href="#">全部</a>
          </li>
          <li class="nav-item"  @click.prevent="category = '戒指'" :class="{'current' : category == '戒指'}">
            <a class="nav-link" href="#">戒指</a>
          </li>
          <li class="nav-item"  @click.prevent="category = '項鍊'" :class="{'current' : category == '項鍊'}">
            <a class="nav-link" href="#">項鍊</a>
          </li>
          <li class="nav-item"  @click.prevent="category = '耳環'" :class="{'current' : category == '耳環'}">
            <a class="nav-link" href="#">耳環</a>
          </li>
          <li class="nav-item"  @click.prevent="category = '手鍊'" :class="{'current' : category == '手鍊'}">
            <a class="nav-link" href="#">手鍊</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-6 col-md-4 my-2 px-1 mheight" v-for="item in filterProduct" :key="item.id">
        <div class="product-wrap">
          <div class="card m-2">
            <img :src="item.imageUrl" class="card-img-top"/>
            <!-- 上架 -->
            <div class="card-body flex-center" v-if="item.is_enabled == 1">
              <div>
                <span class="icon" @click='goSingProduct(item.id)'>
                  <i class="fas fa-search fa-2x"></i>
                </span>
                <span class="icon" @click="addToCart(item.id, 1)">
                  <i class="fas fa-cart-arrow-down fa-2x"></i>
                </span>
              </div>
            </div>
            <!-- 下架 -->
            <div class="card-body flex-center sold-out" v-else>
              <p class="Kalam-font">
               Sold out
              </p>
            </div>
          </div>
          <div class="d-flex m-2 px-1">
            <div>{{item.title}}</div>
            <div class="ml-auto">
              <a href="#" @click.prevent="updateLike(item.id)" >
                <i class="far fa-heart" v-if="!checkLikeStatus(item.id)"></i>
                <i class="fas fa-heart text-danger" v-if="checkLikeStatus(item.id)"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination v-if="category == 'all'" :pages="pagination" @ChangePagenation="getPageProduct"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/pagination'
export default {
  data () {
    return {
      pageProducts: [],
      allProducts: [],
      category: 'all',
      pagination: {},
      like: []
    }
  },
  methods: {
    getPageProduct (page = 1) {
      let vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
      this.$http.get(url).then(res => {
        if (res.data.success) {
          vm.pageProducts = res.data.products
          vm.pagination = res.data.pagination
        }
      })
    },
    getALLProduct () {
      let vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      this.$http.get(url).then(res => {
        if (res.data.success) {
          vm.allProducts = res.data.products
        }
      })
    },
    addToCart (id, qty = 1) {
      let cart = {
        product_id: id,
        qty
      }
      this.$store.dispatch('addToCart', cart)
    },
    updateLike (id) {
      let vm = this
      if (vm.like.some(ele => ele === id)) {
        let num = vm.like.indexOf(id)
        vm.like.splice(num, 1)
      } else {
        vm.like.push(id)
      }
      localStorage.setItem('like', JSON.stringify(vm.like))
    },
    checkLikeStatus (id) {
      let vm = this
      if (vm.like.some(ele => ele === id)) {
        return true
      } else {
        return false
      }
    },
    goSingProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  },
  components: {
    pagination
  },
  computed: {
    filterProduct () {
      var vm = this
      if (vm.category === 'all') {
        return vm.pageProducts
      }
      return vm.allProducts.filter(function (item) {
        return item.category.match(vm.category)
      })
    }
  },
  created () {
    let vm = this
    vm.getPageProduct()
    vm.getALLProduct()
    if (localStorage.getItem('like')) {
      vm.like = JSON.parse(localStorage.getItem('like')) || []
    } else {
      vm.like = []
    }
    vm.checkLikeStatus()
  }
}
</script>

<style lang="scss" scoped>
a{
  color: #000;
}
.nav-item{
  position: relative;
}
.nav-item:before{
  content: "";
  display: block;
  width: 80%;
  height: 7px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 17%;
  margin: auto;
  background-color: rgba(23,162,184,.5);
  opacity: 0;
}
.current:before{
  opacity: 1;
}

.icon {
  display: inline-block;
  padding: 5px;
  cursor: pointer;
  border: .5px solid #eee;
  border-radius: 5px;
  margin: 0 5px;
  color: #ccc;
}
.icon:hover{
  color:#222
}
.card-body {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(110, 110, 110, 0.6);
  transition: .8s;
  opacity: 0;
}
.sold-out{
  opacity: 1;
}
.sold-out>p{
  background-color:rgba(255,102,102,.4);
  border:1px solid #fff;
  padding: 5px;
  border-radius: 3px;
}
.card:hover .card-body{
   opacity: 1;
}
.product-wrap {
  border: 1.5px solid #ccc;
  border-radius: 5px;
}
</style>
