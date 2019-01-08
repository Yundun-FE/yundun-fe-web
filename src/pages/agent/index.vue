<template>
  <page>
    <DmConsole>
      <div slot="toolbar">
        <el-button
          type="primary"
          @click="handleClickAdd"
        >新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="list"
      >
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        />
        <el-table-column
          prop="website"
          label="网站"
        />
        <el-table-column
          label="操作"
          align="right"
          width="80"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </DmConsole>
    <DialogAdd ref="DialogAdd" @submit="handleAddSubmit"/>
  </page>
</template>

<script>
import DialogAdd from './components/DialogAdd'
import Fetch from '@/utils/fetch'

export default {
  components: { DialogAdd },

  data() {
    return {
      loading: true,
      list: [],
      total: 0
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.loading = true
      const data = await Fetch.get('/agents')
      this.list = data.list
      this.loading = false
    },

    handleEdit(form) {
      this.$refs.DialogAdd.handleOpen(form)
    },

    async handleAddSubmit(form) {
      const mode = form._mode
      try {
        mode === 'EDIT' ? await Fetch.put(`/agents/${form.id}`, form) : await Fetch.post('/agents', form)
      } catch (e) {
        return
      }
      this.$refs.DialogAdd.handleClose()
      this.init()
    },

    handleClickAdd() {
      this.$refs.DialogAdd.handleOpen()
    }
  }
}
</script>
