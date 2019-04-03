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
      apiName: 'jobs',
      mode: 'Edit',
      id: this.$route.params.id
    }
  }
}
</script>
