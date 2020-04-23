<template>
  <div class="row">
    <div class="col-12 my-4">
      <div class="mb-5">
        <p class="h6 text-muted font-weight-bold">購物車</p>
        <p class="h3">SHOPPING CART</p>
      </div>
      <div v-if="shopingCart.total == 0">
        <p class="h4 text-center">購物車內無商品</p>
        <p class="text-center">
          <router-link to="/">
            <i class="fas fa-long-arrow-alt-left"></i>
            回到<span class="Kalam-font">cheri</span>購物
          </router-link>
        </p>
      </div>
      <table class="table" v-else>
        <thead>
          <tr>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">金額</th>
            <th scope="col" class="text-center">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in shopingCart.carts" :key="item.id">
            <td>{{item.product.title}}
              <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
            </td>
            <td>{{item.qty}}</td>
            <td>{{item.total}}</td>
            <td class="text-center"><i class="fas fa-times" @click="delProduct(item)"></i></td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">總金額</td>
            <td class="text-center">{{shopingCart.total}}</td>
          </tr>
          <tr v-if="shopingCart.total !== shopingCart.final_total">
            <td colspan="3" class="text-right">折扣價</td>
            <td  class="text-center text-info">{{shopingCart.final_total}}</td>
          </tr>
          <tr>
            <td>使用折價卷</td>
            <td colspan="2">
              <div class="input-group input-group-sm">
                <input type="text" placeholder="請輸入折價卷號碼" class="form-control" v-model="coupon_code">
                <div class="input-group-append">
                  <button type="button" class="btn btn-info" @click="addCouponCode">套用</button>
                </div>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-12 my-4" v-if="shopingCart.total !== 0">
      <hr>
      <div class="mb-5">
        <p class="h6 text-muted font-weight-bold">客戶資訊</p>
        <p class="h3">INFORMATION</p>
      </div>
      <form @submit.prevent="createOrder">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="username">姓名 Name</label>
            <input v-model="form.user.name"  v-validate="'required'" type="text" id="username" name="name" placeholder="請輸入姓名" class="form-control">
            <span class="text-danger" v-if="errors.has('name')">姓名不可為空</span>
          </div>
          <div class="form-group col-md-6">
            <label for="phone">電話 Phone</label>
            <input v-model="form.user.tel" v-validate="'required'" type="text" id="phone" name="phone" placeholder="請輸入電話" class="form-control">
            <span class="text-danger" v-if="errors.has('phone')">電話不可為空</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">信箱 Email</label>
            <input v-model="form.user.email" v-validate="'required|email'" type="text" id="email" name="email" placeholder="請輸入信箱" class="form-control">
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
          </div>
          <div class="form-group col-md-6">
            <label for="address">住址 Address</label>
            <input v-model="form.user.address" v-validate="'required'" type="text" id="address" name="address" placeholder="請輸入住址" class="form-control">
            <span class="text-danger" v-if="errors.has('address')">住址不可為空</span>
          </div>
        </div>
        <div class="form-group">
          <label for="usermsg">留言</label>
          <textarea v-model="form.message" name="msg" id="usermsg" cols="30" rows="3" class="w-100"></textarea>
        </div>
        <div class="text-center">
          <button class="btn btn-info px-5">建立訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    delProduct (item) {
      this.$store.dispatch('delProduct', item)
    },
    createOrder () {
      let vm = this
      let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: vm.form }).then(res => {
            if (res.data.success) {
              vm.$router.push(`/comfirm_order/${res.data.orderId}`)
              let message = '訂單已建立'
              let status = 'success'
              vm.$store.dispatch('updateMessage', { message, status })
            }
          })
        } else {
          let message = '表單輸入有誤，請重填'
          let status = 'danger'
          vm.$store.dispatch('updateMessage', { message, status })
        }
      })
    },
    addCouponCode () {
      let vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      this.$http.post(url, {data: coupon}).then(res => {
        if (res.data.success) {
          this.getCart()
        } else {
          vm.$bus.$emit('message:push', '找不到此優惠卷', 'danger')
        }
      })
    }
  },
  computed: {
    shopingCart () {
      return this.$store.state.shopingCart
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang='scss' scoped>
.fa-times{
  cursor: pointer;
}
.fa-times:hover{
  color: rgb(185, 13, 13);
}
.h3{
  text-decoration:underline;
}
</style>
