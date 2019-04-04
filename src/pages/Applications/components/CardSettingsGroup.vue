<template>
  <CardSettings
    :title="title"
    height="400"
    @edit="$refs.ModalForm.handleOpen()"
  >
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="content"
      row-key="name"
      size="small"
    />
    <ModalForm ref="ModalForm" :fields="[ 'name', 'title', 'description']" title-label="配置">
      <template slot-scope="scope">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="Name"
        >
          <a-input
            v-decorator="['name']"
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="别名"
        >
          <a-input
            v-decorator="['title']"
            placeholder="别名"
          />
        </a-form-item>
      </template>
    </ModalForm>
  </CardSettings>
</template>

<script>
import ModalProxy from './ModalProxy'
import jobsMixins from '@/mixins/jobs'
import CardSettings from '@/components/Card/CardSettings'

export default {
  components: { ModalProxy, CardSettings },

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
