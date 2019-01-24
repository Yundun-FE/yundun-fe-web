<template>
  <DialogForm
    ref="dialog"
    v-model="form"
    :rules="rules"
    title="新增应用"
    @submit="handleSubmit"
  >
    <FormRow />
  </DialogForm>
</template>

<script>
import create from '@/utils/create-basic'
import FormRow from './FormRow'
import consoleEdit from '@/mixins/consoleEdit'

export default create({
  name: 'DialogAdd',

  components: { FormRow },

  mixins: [consoleEdit],

  data() {
    return {
      API_NAME: 'applications'
    }
  },

  methods: {
    handleOpen(form) {
      if (form) this.init(form.id)
      this.$refs.dialog.handleOpen(form)
    }
  }
})
</script>
