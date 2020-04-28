<template>
  <div>
    <div class="text-right">
      <button type="button" class="btn btn-primary mb-2" @click="openCouponModel(null, false)">新增優惠卷</button>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">折扣標題</th>
            <th scope="col">折扣代碼</th>
            <th scope="col">折數</th>
            <th scope="col">到期日</th>
            <th scope="col">啟用</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{item.title}}</td>
            <td>{{item.code}}</td>
            <td>{{item.percent}}%</td>
            <td>{{item.due_date}}</td>
            <td>
              <span v-if="item.is_enabled == true"><i class="fas fa-circle text-success"></i></span>
              <span v-else><i class="fas fa-circle text-danger"></i></span>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="openCouponModel(item, true)">編輯</button>
              <button type="button" class="btn btn-danger" @click.prevent="openDelCouponModal(item)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁 -->
    <pagination :pages="pagination" @ChangePagenation="getCoupons"></pagination>
    <!-- 刪除視窗 -->
    <delModal :data="delCoupon"  @delete="deleteCoupon"></delModal>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單詳細內容</span>
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="title">標題</label>
                    <input type="text" v-model="tempCoupon.title" class="form-control" id="title" placeholder="折扣標題" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="code">代碼</label>
                    <input type="text" v-model="tempCoupon.code" class="form-control" id="code" placeholder="折扣代碼" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="discount">折數</label>
                    <input type="number" v-model="tempCoupon.percent" class="form-control" id="discount" placeholder="折扣數" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日</label>
                    <input type="date" v-model="tempCoupon.due_date" class="form-control" id="due_date" placeholder="到期日" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col">
                    <div class="form-check">
                      <input class="form-check-input" v-model="tempCoupon.is_enabled"
                      :true-value='1'
                      :false-value='0'
                      type="checkbox" id="is_enabled"/>
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/pagination'
import delModal from '@/components/delModal'
export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      modifyCoupon: false,
      tempCoupon: [],
      delCoupon: []
    }
  },
  methods: {
    getCoupons (page = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      let vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(res => {
        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.pagination = res.data.pagination
          vm.$store.dispatch('updateLoading', false)
        }
      })
    },
    openCouponModel (data, status) {
      if (status) {
        this.tempCoupon = JSON.parse(JSON.stringify(data))
      } else {
        this.tempCoupon = {}
      }
      this.modifyCoupon = status
      $('#couponModal').modal('show')
    },
    updataCoupon () {
      let vm = this
      let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      let httpMethod = 'put'
      let message = '已更新優惠卷'
      let status = 'success'
      if (!this.modifyCoupon) {
        url = ` ${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
        httpMethod = 'post'
        message = '已新增優惠卷'
      }
      vm.$http[httpMethod](url, {data: vm.tempCoupon}).then(res => {
        if (!res.data.success) {
          message = '系統忙碌，請稍後'
          status = 'danger'
        }
        vm.getCoupons()
      })
      $('#couponModal').modal('hide')
      vm.$store.dispatch('updateMessage', {message, status})
    },
    openDelCouponModal (item) {
      this.delCoupon = Object.assign({}, item)
      $('#delModal').modal('show')
    },
    deleteCoupon (id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`
      let vm = this
      this.$http.delete(url).then(res => {
        if (res.data.success) {
          $('#delModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  },
  components: {
    pagination,
    delModal
  },
  created () {
    this.getCoupons()
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
