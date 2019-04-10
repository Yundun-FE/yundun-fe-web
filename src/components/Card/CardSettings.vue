<style lang="scss">
.CardSettings{
  .ant-card-body{
    overflow: hidden;
    .ps-container{
      margin: -12px;
      padding: 12px;
      height: 300px;
    }
  }
}
</style>

<template>
  <a-card
    :class="b()"
    :title="title"
    :style="{'height': isNaN(height) ? height : `${height}px`}"
  >
    <template>
      <div slot="extra">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleSettingClick">
            <a-menu-item key="modify">编辑</a-menu-item>
            <a-menu-item key="delete">删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
    </template>
    <VuePerfectScrollbar>
      <slot />
    </VuePerfectScrollbar>
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'CardSettings',

  components: {},

  props: {
    title: String,
    height: [Number, String]
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleSettingClick(val) {
      this.$emit('edit', val.key)
    }
  }
})
</script>
