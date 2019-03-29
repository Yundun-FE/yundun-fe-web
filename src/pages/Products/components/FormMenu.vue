<template>
  <div>
    <!-- {{ form.menus }} -->
    <a-list :data-source="form.menus">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-input v-model="item.name"/>
      </a-list-item>
    </a-list>
  </div>
  <!-- <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? 'Passengers' : ''"
      :required="false"
    >
      <a-input
        v-decorator="['names']"
        placeholder="菜单名称"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length > 1"
        :disabled="form.getFieldValue('keys').length === 1"
        class="dynamic-action-button"
        type="minus-circle-o"
        @click="() => remove(k)"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length > 1"
        :disabled="form.getFieldValue('keys').length === 1"
        class="dynamic-action-button"
        type="up-circle"
        @click="() => remove(k)"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length > 1"
        :disabled="form.getFieldValue('keys').length === 1"
        class="dynamic-action-button"
        type="down-circle"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button
        type="dashed"
        style="width: 60%"
        @click="add"
      >
        <a-icon type="plus" />新增菜单
      </a-button>
    </a-form-item>
  </a-form> -->
</template>

<script>
let id = 0
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
  computed: {
    form() {
      return this.$parent.model
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    // this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  methods: {
    remove(k) {
      const { form } = this
      const keys = form.getFieldValue('keys')
      if (keys.length === 1) {
        return
      }

      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },

    add() {
      const { form } = this
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(++id)
      form.setFieldsValue({
        keys: nextKeys
      })
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style>
.dynamic-action-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
  margin-right: 8px;
}
.dynamic-action-button:hover {
  color: #777;
}
.dynamic-action-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
