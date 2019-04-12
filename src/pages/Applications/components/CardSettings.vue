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
      style="width:25%; textAlign:'center'"
      @click="handleOpenModal"
    >目录配置</a-card-grid>
    <ModalMenus ref="ModalMenus" />
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'
import ModalMenus from './ModalMenus'

export default create({
  name: 'CardSettings',

  components: { ModalMenus },

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleOpenModal() {
      this.$refs.ModalMenus.handleOpen()
    }
  }
})
</script>
