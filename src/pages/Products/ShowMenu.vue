<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <TableMenu />
    </DmEdit>
  </page>
</template>

<script>
import TableMenu from './components/TableMenu'
import consoleEdit from '@/mixins/consoleEdit'

export default {
  components: { TableMenu },

  mixins: [consoleEdit],

  data() {
    return {
      apiName: 'applications',
      mode: 'Edit'
    }
  },

  created() {
    this.init(this.$route.params.appId)
  }
}
</script>
