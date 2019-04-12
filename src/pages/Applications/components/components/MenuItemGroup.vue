<style lang="less">
.ant-card.MenuItemGroup {
  transition: none;
}
</style>

<template>
  <a-card :class="b()">
    <template slot="title">
      <a-input v-model="item.title" />
    </template>
    <template v-if="item.childrens">
      {{ item.childrens }}
      <Menus v-model="item.childrens" collection="childrens" lock-axis="y">
        <MenuItemGroup
          v-for="(citem, index) in item.childrens"
          :item="citem"
          :key="index"
          :index="index"
        />
      </Menus>
    </template>
  </a-card>
</template>

<script>
import { ContainerMixin, ElementMixin } from 'vue-slicksort'
import create from '@/utils/create-basic'
import SubMenus from './SubMenus'
import { deepClone } from '@/utils'

export default create({
  name: 'MenuItemGroup',

  mixins: [ElementMixin],

  components: { SubMenus },

  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  watch: {
    item(val) {
      this.init(val)
    }
  },

  data() {
    return {
      data: this.init(this.item)
    }
  },

  computed: {},

  methods: {
    init(val) {
      this.data = deepClone(val)
    }
  }
})
</script>
