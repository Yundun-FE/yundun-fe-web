<style lang="postcss">
</style>

<template>
  <div :class="b()">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'HeaderTab',

  components: {},

  props: {
    value: {

    },
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeName: ''
    }
  },

  computed: {},

  watch: {
    value(val) {
      this.activeName = val
    }
  },

  methods: {
    handleClick(val) {
      this.$emit('input', val)
    }
  }
})
</script>
