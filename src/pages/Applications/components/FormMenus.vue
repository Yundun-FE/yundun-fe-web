<style lang="less">
</style>

<template>
  <div>
    <Menus
      v-model="data"
      :use-drag-handle="true"
      lock-axis="y"
    >
      <SubMenus
        v-for="(item, index) in data"
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
  </div>
</template>

<script>
import Menus from './components/Menus'
import SubMenus from './components/SubMenus'
import MenuItemGroup from './components/MenuItemGroup'
import jobsMixin from '@/mixins/jobs'

export default {
  components: {
    Menus,
    SubMenus,
    MenuItemGroup
  },

  mixins: [jobsMixin],

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
    }
  },

  computed: {},

  methods: {
    handleRemove(index) {
      this.jobsData.menus.splice(index, 1)
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
