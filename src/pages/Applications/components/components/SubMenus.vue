<style lang="less">
body {
  .SubMenus {
    transition: none;

    &__icon {
      cursor: pointer;
      display: inline-block;
      margin-right: 12px;
    }

    &__action{
      cursor: pointer;
      margin-left: 10px;
      font-size: 18px;

      &:hover{
        color: --color-primary;
      }
    }
  }
}
</style>

<template>
  <a-card :class="b()">
    <template slot="title">
      <!-- <a-dropdown>
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
      </a-dropdown> -->
      <a-popover title="组图标">
        <template slot="content">
          <a-input v-model="item.icon"/>
        </template>
        <my-icon
          :class="b('icon')"
          :type="item.icon || 'icon-appstore'"
        />
      </a-popover>
      <a-input
        v-model="item.title"
        style="width: 180px"
        placeholder="名称"
      />
    </template>
    <template slot="extra">
      <a-dropdown :trigger="['click']" placement="bottomCenter">
        <a-menu
          slot="overlay"
          @click="(row) => handleMenuAdd(row, item.childrens)"
        >
          <a-menu-item
            v-for="(item, index) in productsData.pages"
            :key="index"
            :data="item"
          >
          <my-icon :type="item.icon" />{{ item.title }}</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px" size="small">
          <a-icon type="plus" /> 添加
        </a-button>
      </a-dropdown>
      <a-tooltip placement="top" title="移除">
        <a-icon
          :class="b('action')"
          type="minus-circle"
          @click="handleRemove"
        />
      </a-tooltip>
      <a-tooltip placement="top" title="拖动排序">
        <my-icon
          v-handle
          :class="b('action')"
          type="icon-menu"
        />
      </a-tooltip>
    </template>

    <!-- 子菜单 -->
    <Menus
      v-model="item.childrens"
      :use-drag-handle="true"
      collection="childrens"
      lock-axis="y"
    >
      <MenuItemGroup
        v-for="(citem, index) in item.childrens"
        :item="citem"
        :key="index"
        :index="index"
        @remove="handleRemoveItem(item.childrens, index)"
      />
    </Menus>
  </a-card>
</template>

<script>
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import Menus from './Menus'
import MenuItemGroup from './MenuItemGroup'
import create from '@/utils/create-basic'
import productsMixin from '@/mixins/products'
import jobsMixin from '@/mixins/jobs'

export default create({
  name: 'SubMenus',

  directives: { handle: HandleDirective },

  components: { Menus, MenuItemGroup },

  mixins: [ElementMixin, jobsMixin, productsMixin],

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
    handleRemove() {
      this.$emit('remove')
    },

    handleRemoveItem(list, index) {
      list.splice(index, 1)
      // this.jobsSaveById()
    },
    handleMenuAdd(row, list) {
      const { key } = row
      const data = this.productsData.pages[key]
      list.push(data)
      // this.jobsSaveById()
    },

    handleMenuIconChange() {

    }
  }
})
</script>
