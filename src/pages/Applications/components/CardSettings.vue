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
    <a-card-grid
      v-for="(item, index) in jobsData.settings"
      :class="b('item')"
      :key="index"
      style="width:25%; textAlign:'center'"
      @click="handleOpenSettings(item.name)"
    >{{ item.title }}</a-card-grid>
    <ModalMenus ref="ModalMenus" />
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'
import jobsMixin from '@/mixins/jobs'
import ModalMenus from './ModalMenus'

export default create({
  name: 'CardSettings',

  components: { ModalMenus },

  mixins: [jobsMixin],

  methods: {
    handleOpenSettings(type) {
      this.$emit('open-modal', type)
    },
    handleOpenModal() {
      this.$refs.ModalMenus.handleOpen()
    }
  }
})
</script>
