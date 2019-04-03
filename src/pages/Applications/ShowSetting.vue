<template>
  <page>
    <a-row
      v-if="data.settings"
      :gutter="20"
    >
      <a-col :span="12">
        <CardProxy />
      </a-col>
    </a-row>
    <!-- <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="基本配置"
      @submit="handleSubmit"
    >
      <FormRow />
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
    </DmEdit> -->
  </page>
</template>

<script>
import jobsMixins from '@/mixins/jobs'
import consoleEdit from '@/mixins/consoleEdit'
import FormRow from './components/FormRow'
import FormApp from './components/FormApp'
import CardProxy from './components/CardProxy'
import FormOptions from './components/FormOptions'
import FormTableCommands from './components/FormTableCommands'
import CardSettings from '@/components/Card/CardSettings'

export default {
  components: { FormRow, FormApp, FormTableCommands, CardProxy, FormOptions, CardSettings },

  mixins: [jobsMixins],

  data() {
    return {
      apiName: 'jobs',
      mode: 'Edit',
      form: {}
    }
  }
}
</script>
