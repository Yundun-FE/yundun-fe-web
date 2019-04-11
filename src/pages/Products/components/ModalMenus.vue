<template>
  <Modal
    ref="Modal"
    :width="1000"
    title-label="目录"
    @submit="handleSubmit"
  >
    <!-- dataSource -->
    <a-table
      v-if="productsData.pages"
      :columns="columns"
      :pagination="false"
      :data-source="productsData.pages"
    >
      <template
        slot="inputId"
        slot-scope="scope"
      >
        <a-input
          v-model="scope.id"
          placeholder="ID"
        />
      </template>
      <template
        slot="inputName"
        slot-scope="scope"
      >
        <a-input
          v-model="scope.name"
          placeholder="Name"
        />
      </template>
      <template
        slot="inputTitle"
        slot-scope="scope"
      >
        <a-input
          v-model="scope.title"
          placeholder="名称"
        />
      </template>
      <template
        slot="inputPath"
        slot-scope="scope"
      >
        <a-input
          v-model="scope.path"
          placeholder="path"
        />
      </template>
      <template
        slot="inputIcon"
        slot-scope="scope"
      >
        <a-input
          v-model="scope.icon"
          placeholder="icon"
        />
      </template>
    </a-table>
    <a-button type="primary" @click="handleAdd">增加</a-button>
  </Modal>
</template>

<script>
import create from '@/utils/create-basic'
import consoleModal from '@/mixins/consoleModal'
import productsMixins from '@/mixins/products'

export default create({
  name: 'ModalMenus',

  mixins: [consoleModal, productsMixins],

  props: {
    fetchSubmit: Function
  },

  data() {
    return {
      columns: [
        {
          title: 'id',
          width: '60px',
          scopedSlots: { customRender: 'inputId' }
        },
        {
          title: 'name',
          width: '120px',
          scopedSlots: { customRender: 'inputName' }
        },
        {
          title: '名称',
          width: '120px',
          scopedSlots: { customRender: 'inputTitle' }
        },
        {
          title: '图标',
          width: '100px',
          scopedSlots: { customRender: 'inputIcon' }
        },
        {
          title: '路径',
          width: '150px',
          scopedSlots: { customRender: 'inputPath' }
        },
        {
          title: '操作',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.productsSaveById()
      } catch (e) {
        return
      }
      this.Notice('ACTION_SUCCESS')
      this.handleClose()
    },

    handleAdd() {
      this.productsData.pages.push({
        name: '',
        title: '',
        path: '',
        icon: ''
      })
    },

    afterOpen(form) {

    }
  }
})
</script>
