<style lang="less">
</style>

<template>
  <Menus v-model="data" lock-axis="y">
    {{ data }}
    <!-- <MenuItemGroup
      v-for="(item, index) in data"
      :index="index"
      :key="index"
      :item="item"
    /> -->
    <SubMenus
      v-for="(item, index) in data"
      :index="index"
      :key="index"
      :item="item"
    />
  </Menus>
</template>

<script>
import Menus from './components/Menus'
import SubMenus from './components/SubMenus'
import MenuItemGroup from './components/MenuItemGroup'

export default {
  components: {
    Menus,
    SubMenus,
    MenuItemGroup
  },

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

  methods: {}
}
</script>
