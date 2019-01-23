<template>
  <page>
    <el-tabs>
      <el-tab-pane
        label="目录管理"
        name="first"
      />
    </el-tabs>
    <DmConsole
      ref="DmConsole"
      :loading="loading"
      :data="list"
      :columns="columns"
      :actions="actions"
      :bind-params="bindParams"
      :multiple-selection.sync="multipleSelection"
      class="padding"
      @init="init"
      @action="handleAction"
    />
    <DialogRow
      ref="DialogRow"
      @submit="handleRowSubmit"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'
import AppPageHeader from './components/AppPageHeader'

export default createCudr({
  components: { DialogRow, AppPageHeader },

  pageName: 'application-page',
  apiName: 'appsPages',

  data() {
    return {
      bindParams: {
        appId: this.$route.params.appId
      }
    }
  },

  methods: {
    handleRowDeploy(scope) {
      const id = scope.row.id
      this.Fetch.post(`/${this.apiName}/${id}/deploy`)
    }
  }
})
</script>
