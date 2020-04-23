<template>
  <div>
    <div class="text-right">
      <button type="button" class="btn btn-primary mb-2" @click="openModal(true)">新增商品</button>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">啟用</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td>{{item.origin_price | currency}}</td>
            <td>{{item.price | currency}}</td>
            <td>
              <span v-if="item.is_enabled == 1"><i class="fas fa-circle text-success"></i></span>
              <span v-else><i class="fas fa-circle text-danger"></i></span>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="openModal(false, item)">編輯</button>
              <button type="button" class="btn btn-danger" @click.prevent="openDelModal(item)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pages="pagination" @ChangePagenation="getProducts"></pagination>
    <!-- 確認刪除視窗 -->
    <delModal :data="delProduct" @delete="deleteProduct"></delModal>
    <!-- 新增修改視窗 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew == true">新增產品</span>
              <span v-else>修改產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" v-model="tempProduct.imageUrl" class="form-control" id="image" placeholder="請輸入圖片連結" />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="upFileLoading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile"/>
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" v-model="tempProduct.title" class="form-control" id="title" placeholder="請輸入標題" />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" v-model="tempProduct.category" class="form-control" id="category" placeholder="請輸入分類" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" v-model="tempProduct.unit" class="form-control" id="unit" placeholder="請輸入單位" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" v-model="tempProduct.origin_price" class="form-control" id="origin_price" placeholder="請輸入原價" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" v-model="tempProduct.price" class="form-control" id="price" placeholder="請輸入售價" />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" v-model="tempProduct.description" class="form-control" id="description" placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" v-model="tempProduct.content" class="form-control" id="content" placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" v-model="tempProduct.is_enabled"
                    :true-value='1'
                    :false-value='0'
                    type="checkbox" id="is_enabled"/>
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatedProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pagination from '@/components/pagination'
import delModal from '@/components/delModal'
export default {
  components: {
    pagination,
    delModal
  },
  methods: {
    getProducts (page = 1) {
      this.$store.dispatch('adminProductModules/getProducts', page)
    },
    openModal (isNew, item = {}) {
      this.$store.dispatch('adminProductModules/updatetemproduct', { isNew, item })
    },
    openDelModal (item) {
      this.$store.dispatch('adminProductModules/openDelModal', item)
    },
    deleteProduct (productId) {
      this.$store.dispatch('adminProductModules/deleteProduct', productId)
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      this.$store.dispatch('adminProductModules/uploadFile', uploadedFile)
    },
    ...mapActions('adminProductModules', ['updatedProduct'])
  },
  computed: {
    ...mapGetters('adminProductModules', ['products', 'pagination', 'tempProduct', 'isNew', 'delProduct', 'upFileLoading'])
  },
  created () {
    this.getProducts()
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
