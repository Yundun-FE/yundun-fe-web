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
        <d-button
          @click="handleCreateEnv"
        >新建环境</d-button>
      </el-form-item>
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
    <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="其他配置"
      @submit="handleSubmit"
    >
      <FormOptions />
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
    <DialogEnv ref="DialogEnv" />
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormRow from './components/FormRow'
import FormApp from './components/FormApp'
import FormProxy from './components/FormProxy'
import FormOptions from './components/FormOptions'
import FormTableCommands from './components/FormTableCommands'
import DialogEnv from './components/DialogEnv'

export default {
  components: { FormRow, FormApp, DialogEnv, FormTableCommands, FormProxy, FormOptions },

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
