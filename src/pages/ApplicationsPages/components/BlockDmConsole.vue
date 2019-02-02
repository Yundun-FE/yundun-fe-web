<template>
  <div>
    <el-form-item label="Name">
      <el-input v-model="data.name" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="data.title" />
    </el-form-item>
    <el-form-item label="区块名">
      <el-input v-model="data.blockName" />
    </el-form-item>
    <FormTableColumn
      :env="env"
      :data="data"
      :settings="settings"
    />
    <el-form-item label="行操作">
      <FormTableActionRow :data="data.props.actionsRow" />
    </el-form-item>
    <el-form-item label="工具栏操作">
      <FormTableActionRow :data="data.props.actionsToolbar" />
    </el-form-item>
    <DmConsole
      :loading="false"
      :data="[{id: '1'}]"
      :columns="data.props.columns"
      :actions-row="data.props.actionsRow"
      :actions-toolbar="data.props.actionsToolbar"
    />
  </div>
</template>

<script>
import FormTableColumn from './FormTableColumn'
import FormTableActionRow from './FormTableActionRow'

export default {
  components: { FormTableColumn, FormTableActionRow },

  props: {
    data: Object,
    settings: Object,
    env: String
  }
}
</script>
