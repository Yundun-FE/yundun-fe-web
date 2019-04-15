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
      {{ jobsData.name }} （{{ jobsData.title }}）
    </template>
    <template slot="extra">
      所属项目：{{ jobsData.productName }}
    </template>
    <a-form layout="inline">
      <a-form-item>
        <yd-form-radio-button
          v-model="id"
          :radios="selectEnv"
          button-style="solid"
          border
          @change="handleChangeEnv"
        />
      </a-form-item>
    </a-form>
    <!-- <div :class="b('footer')">
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
    </div> -->
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
          label: '配置',
          key: 'setting'
        },
        {
          label: '目录',
          key: 'menu'
        }
      ]
    }
  },

  watch: {
    $route(val) {
      this.initMenu()
    }
  },

  created() {
    this.initMenu()
  },

  methods: {
    initMenu() {
      const nameArr = this.$route.name.split('.')
      const name = nameArr[nameArr.length - 1]
      this.current = [name]
    },

    handleChangeEnv(id) {
      this.Jump.applicationsId(id)
    }
  }
})
</script>
