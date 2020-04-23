<template>
  <div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">姓名</th>
            <th scope="col">信箱</th>
            <th scope="col">總金額</th>
            <th scope="col">付款</th>
            <th scope="col">成立時間</th>
            <th scope="col">內容</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in orders" :key="data.id">
            <td>{{data.user.name}}</td>
            <td>{{data.user.email}}</td>
            <td>{{data.total | currency}}</td>
            <td>
              <span v-if="data.is_paid == true"><i class="fas fa-circle text-success"></i></span>
              <span v-else><i class="fas fa-circle text-danger"></i></span>
            </td>
            <td>{{data.create_at | changeTime}}</td>
            <td>
              <button type="button" class="btn" @click="openOrderModel(data,false)"><i class="far fa-file-alt"></i></button>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="openOrderModel(data,true)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pages="pagination" @ChangePagenation="getOrders"></pagination>
    <!-- 編輯model -->
      <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="modifyOrder == false">訂單詳細內容</span>
              <span v-else>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="modifyOrder == true">
              <div class="col-12">
                <p class="h5">客戶資料</p>
              </div>
              <div class="col-6" v-if="tempOrder.user">姓名: <input type="text" v-model="tempOrder.user.name"></div>
              <div class="col-6" v-if="tempOrder.user">電話: <input type="text" v-model="tempOrder.user.tel"></div>
              <div class="col-6" v-if="tempOrder.user">信箱: <input type="text" v-model="tempOrder.user.email"></div>
              <div class="col-6" v-if="tempOrder.user">住址: <input type="text" v-model="tempOrder.user.address"></div>
            </div>
            <div class="row" v-else>
              <div class="col-12">
                <p class="h5">客戶資料</p>
              </div>
              <div class="col-6" v-if="tempOrder.user">姓名: {{tempOrder.user.name}}</div>
              <div class="col-6" v-if="tempOrder.user">電話: {{tempOrder.user.tel}}</div>
              <div class="col-6" v-if="tempOrder.user">信箱: {{tempOrder.user.email}}</div>
              <div class="col-6" v-if="tempOrder.user">住址: {{tempOrder.user.address}}</div>
            </div>
            <hr>
            <div class="row">
              <div class="col-12">
                <p class="h5">訂單資料</p>
              </div>
              <div class="col-6">訂單編號: {{tempOrder.id}}</div>
              <div class="col-6" v-if="tempOrder.create_at">訂單成立時間: {{tempOrder.create_at | changeTime}}</div>
              <div class="col-6">訂單總金額: {{tempOrder.total | currency}}</div>
              <div class="col-6" v-if="tempOrder.is_paid">是否付款: 已付款</div>
              <div class="col-6" v-else>是否付款: 待付款</div>
              <div class="col-6" v-if="tempOrder.paid_date">付款時間: {{tempOrder.paid_date | changeTime}}</div>
            </div>
            <hr>
            <div class="row">
              <div class="col-12">
                <p class="h5">購買商品</p>
              </div>
              <div class="col-12 col-md-6" v-for=" (data, i) in tempOrder.products" :key="i">
                <dl>
                  <dt>商品名稱: {{data.product.title}}</dt>
                  <dd>單價: {{data.final_total | currency}}</dd>
                  <dd>數量: {{data.qty}}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" v-if="modifyOrder == false">確認</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"  v-if="modifyOrder == true">取消</button>
            <button type="button" class="btn btn-primary"  v-if="modifyOrder == true" @click="updatedOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/pagination'
export default {
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: [],
      modifyOrder: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
      let vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(res => {
        if (res.data.success) {
          vm.orders = res.data.orders
          vm.pagination = res.data.pagination
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    openOrderModel (data, status) {
      this.tempOrder = JSON.parse(JSON.stringify(data))
      this.modifyOrder = status
      $('#orderModal').modal('show')
    },
    updatedOrder () {
      let vm = this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
      let message = '已更新訂單內容'
      let status = 'success'
      vm.$http.put(url, {data: vm.tempOrder}).then(res => {
        if (!res.data.success) {
          message = '系統忙碌，請稍後'
          status = 'danger'
        }
        $('#orderModal').modal('hide')
        vm.$store.dispatch('updateMessage', {message, status})
        vm.getOrders()
      })
    }
  },
  components: {
    pagination
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  min-height: 85vh;
  overflow: auto;
}
.table {
  min-width: 800px;
}
</style>
