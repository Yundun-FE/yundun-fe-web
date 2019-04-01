<template>
  <div>
    <a-list
      :data-source="form.settings.proxy"
      item-layout="horizontal"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item">
        <a-list-item-meta>
          <span slot="title">{{ item.name }}</span>
          <span slot="description">{{ item.remarks }}</span>
        </a-list-item-meta>
        <a-input
          v-model="item.target"
          placeholder="Target"
        >
          <a-icon slot="addonAfter" type="ellipsis" @click="handleShowMore(item.name)"/>
        </a-input>
      </a-list-item>
    </a-list>
    <ModalAttrEnvs ref="ModalAttrEnvs"/>
  </div>
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
      return this.$parent.$parent.$parent.form
    }

  },

  methods: {
    async handleShowMore(key) {
      this.$refs.ModalAttrEnvs.handleOpen({ attr: 'proxy', key })
    }
  }
}
</script>
