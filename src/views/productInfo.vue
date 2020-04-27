<template>
  <div class="row">
    <div class="col-12 col-md-7 text-center">
      <img class="img-fluid" :src="productInfo.imageUrl" />
    </div>
    <div class="col-12 col-md-5 align-self-center mt-4">
      <h2 class="h4">{{productInfo.title}}</h2>
      <div class="my-3 d-flex justify-content-between">
        <span>${{productInfo.price}}</span>
        <a href="#" @click.prevent="updateCollect(productInfo.id, productInfo.title)">
          <i class="far fa-heart" v-if="!checkLikeStatus(productInfo.id)"></i>
          <i class="fas fa-heart text-danger" v-if="checkLikeStatus(productInfo.id)"></i>
        </a>
      </div>
      <div class="form-row">
        <div class="col-4 pr-0">
          <div class="input-group input-group-sm h-100">
            <div class="input-group-prepend">
              <button
                class="btn btn-outline-dark border-0"
                type="button"
                :disabled=" qty == 1"
                :class="{'cursor-default' : qty == 1}"
                @click="productQty('reduce')"
              >-</button>
            </div>
            <input
              type="number"
              class="form-control h-100 text-center border-0"
              disabled
              v-model="qty"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-dark border-0"
                type="button"
                @click="productQty('add')"
              >+</button>
            </div>
          </div>
        </div>
        <div class="col pl-0">
          <button class="btn btn-info text-center w-100" @click="addToCart(urlId,qty)">加入購物車</button>
        </div>
      </div>
      <div class="caption my-3">
        <p>{{productInfo.description}}</p>
      </div>
    </div>
    <div class="col my-4">
      <hr>
      <p class="text-center">{{productInfo.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productInfo: {},
      qty: 1
    }
  },
  methods: {
    getProductInfo () {
      let vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.urlId}`
      vm.$http.get(url).then(res => {
        if (res.data.success) {
          vm.productInfo = res.data.product
        }
      })
    },
    productQty (str) {
      let vm = this
      if (str === 'add') {
        vm.qty = vm.qty + 1
      } else {
        vm.qty = vm.qty - 1
      }
      console.log(vm.qty)
    },
    addToCart (id, qty) {
      let cart = {
        product_id: id,
        qty
      }
      this.$store.dispatch('addToCart', cart)
    },
    updateCollect (id, title) {
      this.$store.dispatch('updateCollect', { id, title })
    },
    checkLikeStatus (id) {
      let vm = this
      if (vm.collect.some(ele => ele.id === id)) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    collect () {
      return this.$store.state.collect
    },
    urlId () {
      return this.$route.params.id
    }
  },
  watch: {
    urlId: function () {
      this.getProductInfo()
    }
  },
  created () {
    this.getProductInfo()
    this.checkLikeStatus()
  }
}
</script>

<style lang='scss' scoped>
a{
  color: #000;
}
.input-group>.input-group-append>.btn,.input-group>.input-group-prepend>.btn,.btn{
  border-radius: 0;
}
.input-group{
  border:1px solid #000;
  border-right: transparent;
}
//去除input num 預設
// input[type=number] {
//   -moz-appearance: textfield;
// }
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
   margin: 0;
}
.cursor-default{
  cursor: default;
}

</style>
