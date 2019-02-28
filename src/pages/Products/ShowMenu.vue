<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <FormMenu/>
    </DmEdit>
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
