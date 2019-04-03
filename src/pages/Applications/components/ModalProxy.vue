<template>
  <a-modal
    v-model="visible"
    :class="b()"
    title="代理配置"
    @ok="saveById"
  >
    <a-list
      :data-source="data.settings.proxy"
      item-layout="horizontal"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
      >
        <a-list-item-meta>
          <span slot="title">{{ item.url }}</span>
          <span slot="description">{{ item.remarks }}</span>
        </a-list-item-meta>

        <a-input
          v-model="item.target"
          placeholder="Target"
          style="width: 350px"
        >
          <a-icon
            slot="addonAfter"
            type="ellipsis"
            @click="handleShowMore(item.name)"
          />
        </a-input>
      </a-list-item>
    </a-list>
    <ModalAttrEnvs ref="ModalAttrEnvs" />
  </a-modal>
</template>

<script>
import create from '@/utils/create-basic'
import dialogBase from '@/mixins/dialogBase'
import jobsMixins from '@/mixins/jobs'
import ModalAttrEnvs from './ModalAttrEnvs'

export default create({
  name: 'ModalProxy',

  mixins: [dialogBase, jobsMixins],

  components: { ModalAttrEnvs },

  methods: {
    async handleShowMore(key) {
      this.$refs.ModalAttrEnvs.handleOpen({ attr: 'proxy', key })
    }

  }
})
</script>
