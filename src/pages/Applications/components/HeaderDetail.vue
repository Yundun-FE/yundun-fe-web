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
      {{ data.title }}
      <!-- <a href="">所属项目：{{ data.name }}</a> -->
    </template>
    <a-form layout="inline">
      <a-form-item>
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
import jobsMixins from '@/mixins/jobs'

export default create({
  name: 'HeaderDetail',

  mixins: [jobsMixins],

  data() {
    return {
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

  methods: {
    handleChangeEnv(id) {
      this.$router.push({
        path: `/develop/products/${id}/setting`
      })
    }
  }
})
</script>
