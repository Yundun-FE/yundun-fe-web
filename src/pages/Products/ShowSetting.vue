<template>
  <page>
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="基本配置"
      @submit="handleSubmit"
    >
      <FormRow />
      <FormApp />
      <el-form-item>
        <el-button
          @click="handleCreateEnv"
        >新建环境</el-button>
      </el-form-item>
    </DmEdit>

    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="指令管理"
      @submit="handleSubmit"
    >
      <FormTableCommands />
    </DmEdit>

    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="代理配置"
      @submit="handleSubmit"
    >
      <FormProxy />
    </DmEdit>
    <DialogEnv ref="DialogEnv" />
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormRow from './components/FormRow'
import FormApp from './components/FormApp'
import FormProxy from './components/FormProxy'
import FormTableCommands from './components/FormTableCommands'
import DialogEnv from './components/DialogEnv'

export default {
  components: { FormRow, FormApp, DialogEnv, FormTableCommands, FormProxy },

  mixins: [consoleEdit],

  data() {
    return {
      API_NAME: 'jobs',
      mode: 'Edit',
      id: this.$route.params.id
    }
  },

  methods: {
    handleCreateEnv() {
      this.$refs.DialogEnv.handleOpen({
        name: this.form.name
      })
    }
  }
}
</script>
