<style lang="less">
.CardSettings{
  .ant-card-head{
    padding: 12px;
    font-size: 14px;

    .ant-card-head-title{
      padding: 0px;
    }
    .ant-card-extra{
      padding: 0px;
    }
  }
  .ant-card-body{
    padding: 0px;

    .ps-container{
      padding: 12px;
      height: calc(400px - 48px);
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
        <a @click="handleSettingClick('modify')">
          <a-icon type="edit" />
        </a>
        <!-- <a-dropdown :trigger="['click']">
          <a-menu slot="overlay" @click="handleSettingClick">
            <a-menu-item key="modify">编辑</a-menu-item>
            <a-menu-item key="delete">删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            操作 <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
      </div>
    </template>
    <VuePerfectScrollbar :style="`${height - 48}px`">
      <slot />
    </VuePerfectScrollbar>
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'CardSettings',

  props: {
    title: String,
    height: [Number, String]
  },

  methods: {
    handleSettingClick(val) {
      this.$emit('edit', val)
    }
  }
})
</script>
