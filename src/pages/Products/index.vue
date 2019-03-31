<template>
  <!-- <PageTable
    ref="PageTable"
    page-name="fe-job"
    api-name="jobs"
  >
    <FormRow slot="FormRow"/>
  </PageTable> -->
  <div>
    <a-row :gutter="16">
      <a-col
        v-for="(item, index) in list"
        :span="8"
        :key="index"
        style="margin-bottom: 16px"
      >
        <a-card :bordered="false">
          <template slot="title">
            <router-link :to="`/develop/products/${item.id}`">{{ item.title }}</router-link>
          </template>
          <p>{{ item.env }}</p>
          <template
            slot="actions"
            class="ant-card-actions"
          >
            <a-icon type="setting" />
            <a-tooltip
              title="编辑"
              placement="top"
            >
              <a-icon
                type="edit"
                @click="handleRowEdit(item)"
              />
            </a-tooltip>
            <a-icon type="ellipsis" />
          </template>
        </a-card>
      </a-col>
    </a-row>
    <ModalForm ref="ModalRow" @submit="handleRowEditSubmit">
      <template slot-scope="scope">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="名称"
        >
          <a-input
            v-decorator="['name']"
            disabled
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="标题">
          <a-input
            v-decorator="['title']"
            placeholder="标题"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="Jenkins Name">
          <a-input
            v-decorator="['jenkinsName']"
            placeholder="Jenkins Name"
          />
        </a-form-item>
      </template>
    </ModalForm>
  </div>
</template>

<script>
import FormRow from './components/FormRow'
import consoleData from '@/mixins/consoleData'
import { close } from 'fs'

export default {
  components: { FormRow },

  mixins: [consoleData],

  data() {
    return {
      api: '/api/v1/jobs',
      apiUri: 'get /api/v1/jobs?name=console-v5-web'
    }
  },

  methods: {
    handleRowEdit(row) {
      this.$refs.ModalRow.handleOpen(row)
    },

    async handleRowEditSubmit(form) {
      console.log(form)
      try {
        await this.Fetch.put(`/api/v1/jobs/${form.id}`, form)
      } catch (e) {
        return
      }
      this.message.success('修改成功')
      console.log(form)
    }
  }
}
</script>
