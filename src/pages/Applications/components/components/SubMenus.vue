<style lang="less">
.ant-card.SubMenus {
  transition: none;
}
</style>

<template>
  <a-card :class="b()">
    <my-icon type="icon-menu" />
    <a-input v-model="item.title"/>
    <Menus v-model="item.childrens" collection="childrens" lock-axis="y">
      <MenuItemGroup
        v-for="(citem, index) in item.childrens"
        :item="citem"
        :key="index"
        :index="index"
      />
    </Menus>
  </a-card>
</template>

<script>
import { ContainerMixin, ElementMixin } from 'vue-slicksort'
import Menus from './Menus'
import MenuItemGroup from './MenuItemGroup'
import create from '@/utils/create-basic'

export default create({
  name: 'SubMenus',

  components: { Menus, MenuItemGroup },

  mixins: [ElementMixin],

  props: {
    item: {
      type: Object,
      default: function() {
        return []
      }
    }
  }
})
</script>
