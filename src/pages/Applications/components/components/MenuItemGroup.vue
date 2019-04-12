<style lang="less">
body {
  .MenuItem {
    transition: none;

    &__title {
      font-size: 14px;

      i{
        font-size: 18px;
        margin-right: 8px;
      }
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
      <span :class="b('title')">
        <my-icon :type="item.icon" />
        {{ item.alias || item.title }}
      </span>
      <!-- <a-input v-model="item.title" placeholder="名称" style="width: 180px" /> -->
    </template>
    <template slot="extra">
      <a-popover :title="item.title">
        <template slot="content">
          <p>ID: {{ item.id }}</p>
          <p>Name: {{ item.name }}</p>
          <p>ICON: {{ item.icon }}</p>
          <div>
            <a-input
              v-model="alias"
              size="small"
              style="width: 100px; margin-right: 8px"
              placeholder="设置别名"
            />
            <a-button
              size="small"
              type="primary"
              @click="saveAlias"
            >
              确定
            </a-button>
          </div>
          <!-- <a-button
            size="small"
            type="danger"
            style="margin-top: 12px"
            @click="handleRemove"
          >
            移除
          </a-button> -->
        </template>
        <a-button size="small">
          <a-icon type="ellipsis" />
        </a-button>
      </a-popover>
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
  </a-card>
</template>

<script>
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import create from '@/utils/create-basic'
import SubMenus from './SubMenus'
import { deepClone } from '@/utils'
import jobsMixin from '@/mixins/jobs'

export default create({
  name: 'MenuItem',

  directives: { handle: HandleDirective },

  mixins: [ElementMixin, jobsMixin],

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
      data: {},
      alias: ''
    }
  },

  computed: {},

  created() {
    this.init(this.item)
  },

  methods: {
    saveAlias() {
      // this.data.alias = this.alias
      // this.item.alias = this.alias

      this.$set(this.data, 'alias', this.alias)
      this.$set(this.item, 'alias', this.alias)

      // this.jobsSaveById()
    },

    handleRemove() {
      this.$emit('remove')
    },

    init(val) {
      const data = deepClone(val)
      this.data = data
      this.alias = data.alias
    }
  }
})
</script>
