<style lang="less">
.HeaderDetail{

  &__footer{
    text-align: center;
    margin: -24px;
    margin-top: 24px;
  }
}
</style>

<template>
  <a-card :class="b()">
    <template slot="title">
      {{ info.rootTitle }}（{{ info.name }}）
    </template>
    <a-form layout="inline">
      <a-form-item label="切换环境">
        <yd-form-radio-button
          v-model="id"
          :radios="selectEnv"
          border
          @change="handleChangeEnv"
        />
      </a-form-item>
    </a-form>

    <div :class="b('footer')">
      <a-menu
        v-model="current"
        mode="horizontal"
      >
        <a-menu-item
          v-for="(item, index) in tabs"
          :key="item.key"
        >
          <router-link :to="item.key">{{ item.label }}</router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'HeaderDetail',

  data() {
    return {
      id: this.$route.params.id,
      current: ['menu'],
      tabs: [
        {
          label: '目录管理',
          key: 'menu'
        },
        {
          label: '编译管理',
          key: 'build'
        },
        {
          label: '项目配置',
          key: 'setting'
        },
        {
          label: '资源配置',
          key: 'assets'
        }
      ]
    }
  },

  computed: {
    info() {
      return this.$parent.info
    },
    selectEnv() {
      return this.$parent.selectEnv
    }
  },

  methods: {
    handleClickTab() {

    },

    handleChangeEnv(id) {
      this.$router.push({
        path: `/develop/products/${id}/setting`
      })
      this.$emit('init')
    }
  }
})
</script>
