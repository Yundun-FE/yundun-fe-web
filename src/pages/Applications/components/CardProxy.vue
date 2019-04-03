<template>
  <CardSettings
    title="代理配置"
    height="400"
    @edit="$refs.ModalProxy.handleOpen()"
  >
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="data.settings.proxy"
      row-key="name"
      size="small"
    />
    <ModalProxy ref="ModalProxy"/>
  </CardSettings>
</template>

<script>
import ModalProxy from './ModalProxy'
import jobsMixins from '@/mixins/jobs'
import CardSettings from '@/components/Card/CardSettings'

export default {
  components: { ModalProxy, CardSettings },

  mixins: [jobsMixins],

  data() {
    return {
      columns: [
        {
          title: '匹配规则',
          dataIndex: 'url'
        },
        {
          title: '目标地址',
          dataIndex: 'target'
        }
      ]
    }
  }
}
</script>
