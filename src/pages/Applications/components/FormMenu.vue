<template>
  <div>
    <!-- {{ form.menus }} -->
    <a-list :data-source="form.menus">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-input v-model="item.name"/>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const id = 0
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    }
  },

  beforeCreate() {
    this.form = this.$form.createForm(this)
    // this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  methods: {

  }
}
</script>
<style>

</style>
