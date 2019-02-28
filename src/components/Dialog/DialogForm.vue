<style lang="scss">
.DialogForm{
  .el-dialog__header{
    text-align: left;
    .el-dialog__title{
      font-size: 16px;
    }
  }

  .el-form-item{
    &__label{
      font-size: 13px;
    }
  }
}
</style>

<template>
  <el-dialog
    :class="b()"
    :title="titleShow"
    :width="width"
    :visible.sync="visible"
    center
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="120px"
    >
      <slot />
    </el-form>
    <div slot="footer">
      <d-button
        type="primary"
        @click="handleSubmit"
      >确定</d-button>
      <d-button @click="handleClose">取消</d-button>
    </div>
  </el-dialog>
</template>

<script>
import create from '../../utils/create-basic'
import dialog from '../../mixins/dialog'
import form from '../../mixins/form'

export default create({
  name: 'DialogForm',

  mixins: [dialog, form],

  props: {
    title: {
      type: String,
      default: ''
    },
    titleLabel: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '680px'
    },
    mode: {
      type: String,
      default: 'Create'
    }
  },

  computed: {
    titleShow() {
      return this.mode === 'Edit' ? `修改${this.titleLabel}` : `创建${this.titleLabel}`
    }
  }
})
</script>
