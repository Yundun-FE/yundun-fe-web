<style lang="less">
</style>

<template>
  <a-card>
    <template slot="title">
      {{ productsData.name }} （{{ productsData.title }}）
    </template>
  </a-card>
</template>

<script>
import productsMixin from '@/mixins/products'

export default {
  mixins: [productsMixin],

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
