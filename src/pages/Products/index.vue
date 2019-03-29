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
            <a-icon type="edit" @click="handleRowEdit(item)" />
            <a-icon type="ellipsis" />
          </template>
        </a-card>
      </a-col>
    </a-row>
    <ModalForm ref="ModalRow">
      <template slot-scope="form">
        <a-form-item label="名称">
          <a-input
            v-decorator="['name']"
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item label="标题">
          <a-input
            v-decorator="['title']"
            placeholder="标题"
          />
        </a-form-item>
        <a-form-item label="Jenkins Name">
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

export default {
  components: { FormRow },

  mixins: [consoleData],

  data() {
    return {
      apiUri: 'get /api/v1/jobs?name=console-v5-web'
    }
  },

  methods: {
    handleRowEdit(row) {
      this.$refs.ModalRow.handleOpen(row)
    }
  }
}
</script>
