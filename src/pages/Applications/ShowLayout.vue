<template>
  <div>
    <HeaderDetail style="margin-bottom: 24px" />
    <router-view />
  </div>
</template>

<script>
import jobsMixins from '@/mixins/jobs'
import productsMixins from '@/mixins/products'
import HeaderDetail from './components/HeaderDetail'

export default {
  name: 'ShowLayout',

  components: { HeaderDetail },

  mixins: [jobsMixins, productsMixins],

  watch: {
    $route(val) {
      this.init()
    }
  },

  created() {
    this.getByName('console-v6-web')
    this.productsGetById(12)
    this.init()
  },

  methods: {
    init() {
      const id = this.$route.params.id
      this.SET_ID(id)
      this.getById()
    }
  }
}
</script>
