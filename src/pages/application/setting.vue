<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <FormRow />
    </DmEdit>
  </page>
</template>

<script>
import FormRow from './components/FormRow'
import consoleEdit from '@/mixins/consoleEdit'

export default {
  components: { FormRow },

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
