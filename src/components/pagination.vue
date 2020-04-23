<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{'disabled' : !pages.has_pre}"
        @click.prevent="getProducts(pages.current_page - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{'active' : pag == pages.current_page}"
        v-for="pag in pages.total_pages"
        :key="pag"
        @click.prevent="getProducts(pag)"
      >
        <a class="page-link" href="#">{{pag}}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled' : !pages.has_next}"
        @click.prevent="getProducts(pages.current_page + 1)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    getProducts: function (page) {
      this.$emit('ChangePagenation', page)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
