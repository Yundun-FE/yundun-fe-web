<template>
  <CardSettings
    :title="title"
    height="400"
    @edit="$refs.ModalCardSetting.handleOpen()"
  >
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="content"
      row-key="name"
      size="small"
    />
    <ModalCardSetting ref="ModalCardSetting"/>
  </CardSettings>
</template>

<script>
import ModalProxy from './ModalProxy'
import jobsMixins from '@/mixins/jobs'
import CardSettings from '@/components/Card/CardSettings'
import FormColumn from './components/FormColumn'
import ModalCardSetting from './components/ModalCardSetting'

export default {
  components: { ModalProxy, CardSettings, FormColumn, ModalCardSetting },

  mixins: [jobsMixins],

  props: {
    title: String,
    content: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Value',
          dataIndex: 'value'
        }
      ]
    }
  }
}
</script>
