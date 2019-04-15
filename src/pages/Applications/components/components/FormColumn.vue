<style lang="scss">
</style>

<template>
  <div :class="b()">
    <a-form-item label="进入配置模式">
      <a-switch v-model="optionsMode" @change="initMode"/>
    </a-form-item>
    <!-- <a-form :form="form" > -->
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="data"
      row-key="name"
    >
      <a-input
        slot="inputName"
        slot-scope="row"
        v-model="row.name"
      />
      <a-input
        slot="inputTitle"
        slot-scope="row"
        v-model="row.title"
        placeholder="别名"
      />
      <template slot="inputDefaultValue" slot-scope="row">
        <template v-if="row.valueType === 'string'">
          <a-input v-model="row.defaultValue" placeholder="Default value"/>
        </template>
        <template v-if="row.valueType === 'number'">
          <a-input-number v-model="row.defaultValue" />
        </template>
        <template v-if="row.valueType === 'switch'">
          <a-switch v-model="row.defaultValue" />
        </template>
        <template v-if="row.valueType === 'img'">
          <FormUploadImg v-model="row.defaultValue" @success="handleUpdateFile"/>
          <a-input v-model="row.defaultValue" />
        </template>
        <template v-if="row.valueType === 'file'">
          <FormUploadFile v-model="row.defaultValue" @success="handleUpdateFile"/>
          <a-input v-model="row.defaultValue" />
        </template>
      </template>

      <template slot="inputValue" slot-scope="row">
        <template v-if="row.valueType === 'string'">
          <a-input v-model="row.value" :placeholder="row.defaultValue"/>
        </template>
        <template v-if="row.valueType === 'number'">
          <a-input-number v-model="row.value" />
        </template>
        <template v-if="row.valueType === 'switch'">
          <a-switch v-model="row.value" />
        </template>
        <template v-if="row.valueType === 'img'">
          <FormUploadImg v-model="row.value" @success="handleUpdateFile"/>
          <a-input v-model="row.value" />
        </template>
        <template v-if="row.valueType === 'file'">
          <FormUploadFile v-model="row.value" @success="handleUpdateFile"/>
          <a-input v-model="row.value" />
        </template>
      </template>

      <template
        slot="action"
        slot-scope="row"
      >
        <a>
          <a-icon
            type="minus-circle-o"
            @click="handleRemove(row.name)"
          />
        </a>
      </template>
    </a-table>

    <a-button
      v-if="optionsMode"
      class="margin-top"
      type="dashed"
      block
      @click="handleAdd"
    >
      <a-icon type="plus" />新增
    </a-button>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'

export default create({
  name: '',

  props: {
    data: Array,
    showRemove: Boolean
  },

  data() {
    return {
      dataSource: deepClone(this.data),
      optionsMode: false,
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      columns: [],
      defaultForm: {
        name: '',
        title: '',
        valueType: 'string'
      },
      VALUE_TYPE: [
        {
          label: '文本',
          value: 'string'
        },
        {
          label: '数字',
          value: 'number'
        },
        {
          label: '开关',
          value: 'switch'
        },
        {
          label: '图片',
          value: 'img'
        },
        {
          label: '文件',
          value: 'file'
        }
        // {
        //   label: '单选项',
        //   value: 'radio'
        // },
        // {
        //   label: '多选项',
        //   value: 'checkbox'
        // }
      ]
    }
  },

  watch: {
    data(val) {
      this.dataSource = deepClone(val)
    }
  },

  created() {
    this.initMode()
  },

  methods: {
    initMode(op = this.optionsMode) {
      console.log(op)
      if (op) {
        this.columns = [
          {
            title: 'Name',
            key: 'name',
            scopedSlots: { customRender: 'inputName' }
          },
          {
            title: '别名',
            key: 'title',
            scopedSlots: { customRender: 'inputTitle' }
          },
          {
            title: '初始值',
            key: 'defaultValue',
            scopedSlots: { customRender: 'inputDefaultValue' }
          },
          {
            title: '操作',
            width: 80,
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ]
      } else {
        this.columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '配置',
            key: 'value',
            scopedSlots: { customRender: 'inputValue' }
          }
        ]
      }
    },
    handleAdd() {
      this.data.push(this.defaultForm)
    },

    handleUpdateFile(defaultValue) {
    },

    handleRemove(name) {
      const index = this.data.map(_ => _.name).indexOf(name)
      this.data.splice(index, 1)
    }
  }
})
</script>
