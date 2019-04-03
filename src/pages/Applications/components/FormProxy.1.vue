<template>
  <el-form-item label="代理配置">
    <TableForm
      v-if="form.settings"
      :data="form.settings.proxy"
      :row="row"
      sort
    >
      <el-table-column
        label="名称"
        prop="name"
        min-width="120"
      >
        <template slot-scope="scope">
          <a-input
            v-model="scope.row.name"
            placeholder="名称"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remarks"
        width="150"
      >
        <template slot-scope="scope">
          <a-input
            v-model="scope.row.remarks"
            placeholder="备注"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Url"
        prop="url"
        width="150"
      >
        <template slot-scope="scope">
          <a-input
            v-model="scope.row.url"
            placeholder="Url"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Target"
        prop="target"
        min-width="180"
      >
        <template slot-scope="scope">
          <a-input
            v-model="scope.row.target"
            placeholder="Target"
          >
            <a-icon slot="addonAfter" type="ellipsis" @click="handleShowMore(scope.row.name)"/>
          </a-input>
        </template>
      </el-table-column>
    </TableForm>
    <ModalAttrEnvs ref="ModalAttrEnvs"/>
  </el-form-item>
</template>

<script>
import { formatLabel } from '@/utils/form'
import ModalAttrEnvs from './ModalAttrEnvs'

export default {
  components: { ModalAttrEnvs },

  data() {
    return {
      row: {
        name: '',
        remarks: '',
        url: '',
        target: ''
      },
      visible: false,
      data: []
    }
  },

  computed: {
    form() {
      return this.$parent.model
    }

  },

  methods: {
    async handleShowMore(key) {
      this.$refs.ModalAttrEnvs.handleOpen({ attr: 'proxy', key })
    }
  }
}
</script>
