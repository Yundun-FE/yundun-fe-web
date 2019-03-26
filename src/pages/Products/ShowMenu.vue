<template>
  <page>

    <a-card title="目录管理">
      <DmEdit
        :loading="loading"
        v-model="form"
        :rules="rules"
        @submit="handleSubmit"
      >
        <FormMenu/>
      </DmEdit>
    </a-card>

  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormMenu from './components/FormMenu'

export default {
  components: { FormMenu },

  mixins: [consoleEdit],

  data() {
    return {
      apiName: 'jobs',
      mode: 'Edit',
      id: this.$route.params.id
    }
  }
}
</script>
