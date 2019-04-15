<style lang="scss">
</style>

<template>
  <Modal
    ref="Modal"
    :fields="[ 'name', 'title', 'description']"
    :width="700"
    title-label="配置"
    @submit="fetchSubmit"
  >
    <template slot-scope="scope">
      <a-form>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item
              label="Name"
            >
              <a-input
                v-model="data.name"
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
        <FormColumn
          :data="data.settings"
          refs="FormColumn"
        />
      </a-form>
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
      data: {},
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
        await this.Fetch.put(`/v2/jobs/${this.jobsId}/settings/${form.name}`, form)
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
