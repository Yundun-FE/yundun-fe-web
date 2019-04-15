<template>
  <page>
    <a-button
      type="primary"
      @click="handleAdd"
    >新增配置组</a-button>

    <a-row
      v-if="jobsData.settings"
      :gutter="20"
      class="margin-top"
    >
      <a-col :span="12">
        <CardSettings @open-modal="handleOpenModal"/>
      </a-col>
      <a-col
        v-for="(item, index) in jobsData.settings"
        :span="12"
        :key="index"
        class="margin-bottom"
      >
        <CardSettingsGroup
          :title="item.title"
          :ref="item.name"
          :content="item"
        />
      </a-col>
    </a-row>
    <ModalForm
      ref="ModalRow"
      :fields="[ 'name', 'title', 'description']"
      :fetch-create="fetchCreate"
      title-label="配置组"
      @submit-success="handleRefresh"
    >
      <template slot-scope="scope">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="Name"
          help="唯一标识，不可修改"
        >
          <a-input
            v-decorator="['name']"
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="别名"
        >
          <a-input
            v-decorator="['title']"
            placeholder="Title"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="介绍"
        >
          <a-input
            v-decorator="['description']"
            placeholder="介绍"
          />
        </a-form-item>
      </template>
    </ModalForm>
  </page>
</template>

<script>
import jobsMixins from '@/mixins/jobs'
import CardSettingsGroup from './components/CardSettingsGroup'
import CardSettings from './components/CardSettings'

export default {
  components: { CardSettings, CardSettingsGroup },

  mixins: [jobsMixins],

  data() {
    return {
      form: {}
    }
  },

  methods: {
    handleOpenModal(type) {
      console.log(this.$refs)
      this.$refs[type][0].handleSettingClick('modify')
    },

    handleRefresh() {
      this.jobsGetById()
    },

    handleAdd() {
      this.$refs.ModalRow.handleOpen()
    },

    fetchUpdate(form) {
      return this.Fetch.put(`/v2/jobs/${form.id}`, form)
    },

    fetchCreate(form) {
      return this.Fetch.post(`/v1/products/${this.jobsData.productId}/settings`, form)
    }
  }
}
</script>
