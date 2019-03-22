<template>
  <div>
    <el-form-item label="Name">
      <el-input
        v-model="data.name"
        disabled
      />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="data.title" />
    </el-form-item>
    <el-form-item label="区块名称">
      <el-input v-model="data.blockName" />
    </el-form-item>
    <el-form-item label="显示">
      <d-checkbox v-model="data.show" />
    </el-form-item>
    <FormTableColumn
      :env="env"
      :data="data"
    />
    <el-form-item label="行操作">
      <FormTableActionRow
        :env="env"
        :data="data.props.actionsRow"
        :row-template="rowRowTemplate"
      />
    </el-form-item>
    <el-form-item label="工具栏操作">
      <FormTableActionRow
        :row-template="toolbarRowTemplate"
        :env="env"
        :data="data.props.actionsToolbar"
      />
    </el-form-item>
    <!-- <DmConsole
      :loading="false"
      :data="[{id: '1'}]"
      :columns="data.props.columns"
      :actions-row="data.props.actionsRow"
      :actions-toolbar="data.props.actionsToolbar"
    /> -->
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
  },

  data() {
    return {
      rowRowTemplate: [
        {
          label: '删除',
          row: {
            label: '删除',
            type: 'danger',
            command: 'Delete'
          }
        },
        {
          label: '编辑',
          row: {
            label: '编辑',
            type: 'primary',
            command: 'Edit'
          }
        }
      ],
      toolbarRowTemplate: [
        {
          label: '创建',
          row: {
            label: '创建',
            type: 'primary',
            command: 'Create'
          }
        },
        {
          label: '删除',
          row: {
            label: '删除',
            type: '',
            command: 'Multiple.Delete'
          }
        }
      ]
    }
  }
}
</script>
