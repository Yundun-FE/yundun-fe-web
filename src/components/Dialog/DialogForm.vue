<template>
  <el-dialog
    :class="b()"
    :title="titleShow"
    :visible.sync="visible"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <slot />
    </el-form>
    <div slot="footer">
      <d-button @click="handleClose">取消</d-button>
      <d-button
        type="primary"
        @click="handleSubmit"
      >保存</d-button>
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
