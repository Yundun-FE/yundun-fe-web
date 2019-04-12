<style lang="less">
body {
  .SubMenus {
    transition: none;

    &__icon {
      cursor: pointer;
      display: inline-block;
      margin-right: 12px;
    }
  }
}
</style>

<template>
  <a-card :class="b()">

    <template slot="title">
      <a-dropdown>
        <a-menu
          slot="overlay"
          @click="handleMenuIconChange"
        >
          <a-menu-item
            v-for="(item, index) in icons"
            :key="index"
          >
            <my-icon :type="item" />
          </a-menu-item>
        </a-menu>
        <my-icon
          :class="b('icon')"
          :type="item.icon || 'icon-appstore'"
        />
      </a-dropdown>

      <a-input
        v-model="item.title"
        style="width: 120px"
        placeholder="名称"
      />
    </template>
    <my-icon
      v-handle
      slot="extra"
      :class="b('btn')"
      type="icon-menu"
    />
    <Menus
      v-model="item.childrens"
      collection="childrens"
      lock-axis="y"
    >
      <a-dropdown>
        <a-menu
          slot="overlay"
          @click="handleMenuAdd"
        >
          <a-menu-item
            v-for="(item, index) in productsData.pages"
            :key="index"
          >
          <my-icon :type="item.icon" />{{ item.title }}</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          Button
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
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
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import Menus from './Menus'
import MenuItemGroup from './MenuItemGroup'
import create from '@/utils/create-basic'
import products from '@/mixins/products'

export default create({
  name: 'SubMenus',

  directives: { handle: HandleDirective },

  components: { Menus, MenuItemGroup },

  mixins: [ElementMixin, products],

  props: {
    icons: [
      'icon-caiwu'
    ],
    item: {
      type: Object,
      default: function() {
        return []
      }
    }
  },

  methods: {
    handleMenuAdd() {

    },

    handleMenuIconChange() {

    }
  }
})
</script>
