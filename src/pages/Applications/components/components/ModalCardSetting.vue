<style lang="scss">
</style>

<template>
  <Modal
    ref="Modal"
    :fields="[ 'name', 'title', 'description']"
    title-label="配置"
    @submit="fetchSubmit"
  >
    <template slot-scope="scope">
      <a-form :form="form">
        <a-form-item
          v-bind="formItemLayout"
          label="Name"
        >
          <a-input
            v-decorator="['name']"
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="别名"
        >
          <a-input
            v-decorator="['title']"
            placeholder="别名"
          />
        </a-form-item>
        <!-- <a-form-item
          v-bind="formItemLayout"
          label="配置类型"
        >
          <a-radio-group
            v-decorator="['type']"
            :options="TYPE"
          />
        </a-form-item> -->
        <template v-for="(item, index) in columns">
          <div :key="index">
            <a-divider />
            <FormColumn
              :show-remove="index > 0"
              :ref="`FormColumn${index}`"
              @remove="handleRemoveColumn(index)"
            />
          </div>
        </template>

        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button
            type="dashed"
            block
            @click="handleAddColumn"
          >
            <a-icon type="plus" />新增
          </a-button>
        </a-form-item>
      </a-form>

      <!-- {{ $refs.FormColumn.getFieldsValue() }} -->
      <!--
          {

          }
         -->
    </template>
  </Modal>
</template>

<script>
import create from '@/utils/create-basic'
import FormColumn from './FormColumn'
import consoleModal from '@/mixins/consoleModal'
import jobsMixins from '@/mixins/jobs'

export default create({
  mixins: [consoleModal, jobsMixins],

  components: { FormColumn },

  data() {
    return {
      form: this.$form.createForm(this),
      columns: [0],
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          span: 12,
          offset: 4
        }
      },
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      defaultForm: {
        name: '',
        title: ''
      }
    }
  },

  methods: {
    async fetchSubmit() {
      const form = this.form.getFieldsValue()
      const columns = []
      this.columns.forEach((item, index) => {
        columns.push(this.$refs[`FormColumn${index}`][0].form.getFieldsValue())
      })

      form.settings = columns
      await this.Fetch.put(`/v2/jobs/${this.jobsId}/settings/${form.name}`, form)
    },

    handleRemoveColumn(index) {
      this.columns.splice(index, 1)
    },

    handleAddColumn() {
      this.columns.push(0)
    },

    afterOpen(form) {
      this.columns = form.settings.map(_ => _.name)
      this.$nextTick(() => {
        this.form.setFieldsValue(Object.assign(this.defaultForm, form))
      })
    }
  }
})
</script>
