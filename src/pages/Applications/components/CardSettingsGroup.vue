<template>
  <CardSettings
    :title="title"
    height="400"
    @edit="$refs.ModalCardSetting.handleOpen(content)"
  >
    <a-list :data-source="content.settings ">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta>
          <a slot="title">{{ item.name }}</a>
        </a-list-item-meta>

        <template v-if="item.valueType === 'string'">
          <a-input v-decorator="['value']" :placeholder="item.defaultValue" />
        </template>

      </a-list-item>
    </a-list>
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
      type: Object,
      default: function() {
        return {}
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
