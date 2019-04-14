<style lang="scss">
</style>

<template>
  <div :class="b()">
    <a-icon
      v-if="showRemove"
      style="cursor: pointer"
      type="minus-circle-o"
      @click="handleRemove"
    />
    <a-form :form="form">
      <a-form-item
        v-bind="formItemLayout"
        label="Name"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-input
              v-decorator="['name']"
              placeholder="Name"
            />
          </a-col>
          <a-col :span="8">
            <a-input
              v-decorator="['title']"
              placeholder="别名"
            />
          </a-col>
          <a-col :span="8">
            <a-select
              v-decorator="['valueType']"
              :options="VALUE_TYPE"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="默认值"
      >
        <template v-if="form.getFieldValue('valueType') === 'string'">
          <a-input v-decorator="['defaultValue']" />
          <a-input v-decorator="['value']" />
        </template>
        <template v-if="form.getFieldValue('valueType') === 'number'">
          <a-input-number v-decorator="['defaultValue']" />
        </template>
        <template v-if="form.getFieldValue('valueType') === 'switch'">
          <a-switch v-decorator="['defaultValue']" />
        </template>
        <template v-if="form.getFieldValue('valueType') === 'img'">
          <FormUploadImg v-decorator="['defaultValue']" @success="handleUpdateFile"/>
          <a-input v-decorator="['defaultValue']" />
        </template>
        <template v-if="form.getFieldValue('valueType') === 'file'">
          <FormUploadFile v-decorator="['defaultValue']" @success="handleUpdateFile"/>
          <a-input v-decorator="['defaultValue']" />
        </template>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: '',

  props: {
    showRemove: Boolean
  },

  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      form: this.$form.createForm(this),
      defaultForm: {
        name: '',
        title: '',
        valueType: 'string'
      },
      VALUE_TYPE: [
        {
          label: '字符串',
          value: 'string'
        },
        {
          label: '数字',
          value: 'number'
        },
        {
          label: '开关',
          value: 'switch'
        },
        {
          label: '图片',
          value: 'img'
        },
        {
          label: '文件',
          value: 'file'
        }
        // {
        //   label: '单选项',
        //   value: 'radio'
        // },
        // {
        //   label: '多选项',
        //   value: 'checkbox'
        // }
      ]
    }
  },

  mounted() {
    this.form.setFieldsValue(this.defaultForm)
  },

  methods: {
    handleUpdateFile(defaultValue) {
      this.form.setFieldsValue({ defaultValue })
    },

    handleRemove() {
      this.$emit('remove')
    }
  }
})
</script>
