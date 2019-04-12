<style lang="less">
</style>

<template>
  <Modal ref="Modal" @submit="handleSave">
    <Menus
      v-model="jobsData.menus"
      :use-drag-handle="true"
      lock-axis="y"
    >
      <SubMenus
        v-for="(item, index) in jobsData.menus"
        :index="index"
        :key="index"
        :item="item"
        @remove="handleRemove(index)"
      />
    </Menus>
    <a-button
      class="margin-top"
      type="dashed"
      block
      @click="handleAdd"
    >增加</a-button>
  </Modal>
</template>

<script>
import Menus from './components/Menus'
import SubMenus from './components/SubMenus'
import MenuItemGroup from './components/MenuItemGroup'
import jobsMixin from '@/mixins/jobs'
import consoleModal from '@/mixins/consoleModal'

export default {
  components: {
    Menus,
    SubMenus,
    MenuItemGroup
  },

  mixins: [consoleModal, jobsMixin],

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  computed: {},

  methods: {
    handleRemove(index) {
      this.jobsData.menus.splice(index, 1)
    },

    handleSave() {
      this.jobsSaveById()
      this.handleClose()
    },

    handleAdd() {
      this.jobsData.menus.push({
        title: '',
        icon: '',
        childrens: []
      })
    }
  }
}
</script>
