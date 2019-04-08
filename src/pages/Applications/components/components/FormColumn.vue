<style lang="scss">
</style>

<template>
  <div :class="b()">
    <a-form
      ref="form"
      :form="form"
    >
      <a-form-item
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        label="Name">
        <a-input
          v-decorator="['name']"
          placeholder="Name"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        label="别名">
        <a-input
          v-decorator="['title']"
          placeholder="别名"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        label="类型">
        <a-radio-group
          v-decorator="['type']"
          :options="VALUE_TYPE"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        label="默认值"
      >
        <template v-if="form.getFieldValue('type') === 'string'">
          <a-input v-decorator="['valueDefault']" />
        </template>
        <template v-if="form.getFieldValue('type') === 'number'">
          <a-input-number v-decorator="['valueDefault']" />
        </template>
        <template v-if="form.getFieldValue('type') === 'boolean'">
          <a-switch v-decorator="['valueDefault']" />
        </template>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: '',

  components: {},

  props: {},

  data() {
    return {
      form: this.$form.createForm(this),
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
          value: 'boolean'
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

  computed: {},

  methods: {}
})
</script>
