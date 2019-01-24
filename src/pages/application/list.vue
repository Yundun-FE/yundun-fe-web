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
      class="padding"
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
      @init="init"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'

export default createCudr({
  pageName: 'application',
  API_NAME: 'applications',

  components: { DialogRow },

  data() {
    return {
      bindParams: {
        type: ''
      }
    }
  }
})
</script>
