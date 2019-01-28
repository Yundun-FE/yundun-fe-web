<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <FormTableCommands/>
    </DmEdit>
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormTableCommands from './components/FormTableCommands'

export default {
  components: { FormTableCommands },

  mixins: [consoleEdit],

  data() {
    return {
      API_NAME: 'jobs',
      mode: 'Edit',
      id: this.$route.params.id
    }
  }
}
</script>
