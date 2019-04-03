<template>
  <page>
    <a-button
      type="primary"
      @click="handleAdd"
    >新增配置组</a-button>

    {{ data.settings }}
    <a-row
      v-if="data.settings"
      :gutter="20"
    >
      <a-col :span="12">
        <!-- <CardProxy /> -->
      </a-col>
    </a-row>
    <ModalForm
      ref="ModalRow"
      :fields="[ 'name', 'title', 'description', 'type']"
      title-label="配置组"
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

const GROUP_TYPE = [
  {
    label: '配置',
    value: 'CONFIG'
  },
  {
    label: '导航',
    value: 'NAVBAR'
  },
  {
    label: '图文资源',
    value: 'ASSETS'
  },
  {
    label: '文件资源',
    value: 'FILES'
  }
]

export default {
  mixins: [jobsMixins],

  data() {
    return {
      form: {},
      GROUP_TYPE
    }
  },

  methods: {
    handleAdd() {
      this.$refs.ModalRow.handleOpen()
    },

    fetchUpdate(form) {
      return this.Fetch.put(`/v2/jobs/${form.id}`, form)
    },

    fetchCreate(form) {
      return this.Fetch.post(`/v2/jobs`, form)
    }
  }
}
</script>
