<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <FormAssets/>
    </DmEdit>
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormAssets from './components/FormAssets'

export default {
  components: { FormAssets },

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
