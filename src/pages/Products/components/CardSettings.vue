<style lang="scss">
.CardSettings {
  &__item {
    cursor: pointer;
  }
}
</style>

<template>
  <a-card
    :class="b()"
    title="常用配置"
  >
    <a-card-grid
      :class="b('item')"
      style="width: 50%; textAlign: 'center'"
      @click="handleOpenModal('pages')"
    >页面管理</a-card-grid>
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'CardSettings',

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleOpenModal(type) {
      this.$emit('item-click', type)
    }
  }
})
</script>
