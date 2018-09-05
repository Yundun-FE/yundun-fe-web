<style lang="stylus">
.card-job {
  margin-bottom: 12px;
}
</style>

<template>
  <el-card class="card-job">
    <div slot="header" class="clearfix">
      <span> {{ data.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="handleEdit">编辑</el-button>
    </div>
    <a :href="data.url" target="_blank">{{ data.url }}</a>
    <div>
      <el-button type="text" @click="handleEdit('account')">账号</el-button>
      <el-button type="text" @click="handleEdit('cmd')">指令</el-button>
    </div>

  </el-card>
</template>

<script>
const TYPE_MAP = {
  test: {
    name: '测试',
    color: 'default'
  },
  pre: {
    name: '预发布',
    color: 'warning'
  },
  'test-online': {
    name: '线上测服',
    color: 'success'
  },
  prod: {
    name: '线上',
    color: 'success'
  }
}

export default {

  components: {},
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },

  methods: {
    handleEdit(name) {
      this.$emit('on-edit', name)
    }
  }
}
</script>
