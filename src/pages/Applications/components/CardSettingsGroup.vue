<style lang="less">
.CardSettingsGroup {
  .ant-list-item-content {
    white-space: nowrap;
  }

  .item {
    &Img {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      background: #eee;
      border-radius: 3px;
      img {
        max-width: 100px;
      }
    }
  }
}
</style>

<template>
  <CardSettings
    :title="title"
    :class="b()"
    height="400"
    @edit="handleSettingClick"
  >
    <a-list :data-source="content.settings ">
      <a-list-item
        slot="renderItem"
        slot-scope="item, index"
      >
        <a-list-item-meta>
          <span slot="title">{{ item.title || item.name }}</span>
        </a-list-item-meta>
        <template v-if="item.valueType === 'string'">
          {{ item.value || item.defaultValue }}
        </template>
        <template v-if="item.valueType === 'img'">
          <div class="itemImg">
            <img
              v-if="item.defaultValue"
              :src="item.value || item.defaultValue"
              :alt="item.title || item.name"
            >
          </div>
        </template>
        <template v-if="item.valueType === 'file'">
          <a :href="item.value || item.defaultValue">{{ item.value || item.defaultValue }}</a>
        </template>
      </a-list-item>
    </a-list>
    <ModalCardSetting
      ref="ModalCardSetting"
      :title="title"
    />
  </CardSettings>
</template>

<script>
import create from '@/utils/create-basic'
import jobsMixins from '@/mixins/jobs'
import CardSettings from '@/components/Card/CardSettings'
import FormColumn from './components/FormColumn'
import ModalCardSetting from './components/ModalCardSetting'

export default create({
  name: 'CardSettingsGroup',

  components: { CardSettings, FormColumn, ModalCardSetting },

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
  },

  methods: {
    handleSettingClick(type) {
      if (type === 'modify') {
        this.$refs.ModalCardSetting.handleOpen(this.content)
      } else if (type === 'delete') {
        this.$confirm({
          title: '确定删除？',
          onOk: () => {
            this.Fetch.delete(`/v1/products/${this.jobsData.productId}/settings/${this.content.name}`)
            this.Notice('ACTION_SUCCESS')
          }
        })
      }
    }
  }
})
</script>
