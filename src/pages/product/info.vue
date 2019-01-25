<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <TableMenu/>
    </DmEdit>
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import TableMenu from './components/TableMenu'

export default {
  components: { TableMenu },

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
