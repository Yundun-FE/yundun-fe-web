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
    </DmEdit>

    <a-card title="代理配置">
      <FormProxy v-if="form.settings"/>
    </a-card>
    <!-- <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      title="代理配置"
      @submit="handleSubmit"
    >
    </DmEdit> -->
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
  </page>
</template>

<script>
import consoleEdit from '@/mixins/consoleEdit'
import FormRow from './components/FormRow'
import FormApp from './components/FormApp'
import FormProxy from './components/FormProxy'
import FormOptions from './components/FormOptions'
import FormTableCommands from './components/FormTableCommands'

export default {
  components: { FormRow, FormApp, FormTableCommands, FormProxy, FormOptions },

  mixins: [consoleEdit],

  data() {
    return {
      apiName: 'jobs',
      mode: 'Edit',
      id: this.$route.params.id,
      form: {}
    }
  },

  watch: {
    $route(val) {
      this.id = this.$route.params.id
    }
  },

  create() {
    this.init()
  },

  methods: {
    async init() {
      this.form = await this.Fetch.get(`/api/v1/jobs/${this.id}`)
      // this.rootForm =
    }
  }
}
</script>
