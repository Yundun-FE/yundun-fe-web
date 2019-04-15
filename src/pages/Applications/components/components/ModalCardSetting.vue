<template>
  <Modal
    ref="Modal"
    :fields="[ 'name', 'title', 'description']"
    :width="700"
    :title="title"
    @submit="fetchSubmit"
  >
    <a-form>
      <a-form-item v-if="jobsData.isChildren" label="设置">
        <a-checkbox v-model="data.useParent">使用父配置</a-checkbox>
      </a-form-item>
      <template v-if="!data.useParent">
        <FormColumn
          :options-mode="optionsMode"
          :data="data.settings"
          refs="FormColumn"
        />
        <a-form-item label="高级配置">
          <a-switch v-model="optionsMode"/>
        </a-form-item>
        <a-row v-if="optionsMode" :gutter="12">
          <a-col :span="12">
            <a-form-item
              label="Name"
            >
              <a-input
                v-model="data.name"
                disabled
                placeholder="Name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="别名"
            >
              <a-input
                v-model="data.title"
                placeholder="别名"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
    </a-form>
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

  props: {
    title: String
  },

  data() {
    return {
      data: {},
      optionsMode: false,
      formItemLayout: {
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
      const form = this.data
      try {
        this.$refs.Modal.startSubmitLoading()
        const { useParent } = form
        // 使用父配置则删除配置
        if (useParent) {
          await this.Fetch.delete(`/v2/jobs/${this.jobsId}/settings/${form.name}`)
        } else {
          await this.Fetch.put(`/v2/jobs/${this.jobsId}/settings/${form.name}`, form)
        }
      } finally {
        this.Notice('ACTION_SUCCESS')
        this.$refs.Modal.handleClose()
        this.$refs.Modal.resetSubmitLoading()
        this.jobsGetById()
      }
    },

    afterOpen(form) {
      const { settings = [] } = form
      this.data = form
    }
  }
})
</script>
