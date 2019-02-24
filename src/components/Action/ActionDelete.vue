<template>
  <el-popover v-model="visible" placement="top" width="160">
    <p>确定删除？</p>
    <div style="text-align: right; margin: 0">
      <d-button size="mini" type="text" @click="visible = false">取消</d-button>
      <d-button type="primary" size="mini" @click="handleClick">确定</d-button>
    </div>
    <d-button slot="reference" type="text" size="small">删除</d-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
      this.visible = false
    }
  }
}
</script>
