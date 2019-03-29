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
            <a-icon type="edit" />
            <a-icon type="ellipsis" />
          </template>
        </a-card>
      </a-col>
    </a-row>
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
  }
}
</script>
