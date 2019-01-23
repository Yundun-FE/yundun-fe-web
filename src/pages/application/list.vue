<template>
  <page>
    <DmConsole
      ref="DmConsole"
      :loading="loading"
      :data="list"
      :columns="columns"
      :actions="actions"
      :bind-params="bindParams"
      :multiple-selection.sync="multipleSelection"
      @init="init"
      @action="handleAction"
    >
      <!-- <div slot="query">
        <el-form>
          <el-form-item>
            <yd-form-radio-button
              :radios="LABEL.MODULES_TYPE"
              v-model="bindParams.type"
              default-label="全部"
              size="medium"
            />
          </el-form-item>
        </el-form>
      </div> -->
    </DmConsole>
    <DialogRow
      ref="DialogRow"
      @submit="handleRowSubmit"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'

export default createCudr({
  pageName: 'application',
  apiName: 'applications',

  components: { DialogRow },

  data() {
    return {
      bindParams: {
        type: ''
      }
    }
  },

  methods: {
    handleRowDetail(scope) {
      this.$router.push({
        path: `${scope.row.id}/pages`,
        append: true
      })
    }
  }
})
</script>
