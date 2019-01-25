<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    />
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'

export default {

  mixins: [consoleEdit],

  data() {
    return {
      API_NAME: 'applications',
      mode: 'Edit'
    }
  },

  created() {
    this.init(this.$route.params.appId)
  }
}
</script>
