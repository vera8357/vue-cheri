<template>
  <div class="container flex-center">
    <form @submit.prevent="signin">
      <div class="text-center">
        <h3 class="mt-5 mt-4">請輸入資料登入</h3>
      </div>
      <div class="form-group">
        <label class="sr-only" for="exampleInputEmail1">管理者信箱</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="user.username"
        />
        <label class="sr-only" for="exampleInputPassword1">管理者密碼</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-info">登入</button>
      <div>
        <router-link to="/home">
          <i class="fas fa-long-arrow-alt-left"></i> 回到
          <span class="Kalam-font">cheri</span>購物
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin: function () {
      const url = `${process.env.APIPATH}/admin/signin`
      const vm = this
      vm.$http.post(url, vm.user).then(res => {
        console.log(res.data)
        if (res.data.success) {
          vm.$router.push('/admin/products')
        } else {
          vm.user = {}
          confirm('驗證錯誤')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 330px;
}
.form-group {
  input {
    margin-bottom: -1px;
  }
}
button {
  width: 100%;
}
</style>
