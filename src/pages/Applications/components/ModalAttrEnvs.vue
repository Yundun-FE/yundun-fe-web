<style lang="less">
.ModalAttrEnvs{

  &__item{
    &.root{
      .ant-list-item-meta-title{
        font-weight: 600;
      }
    }

    &.focus{
      background: #EEE;
    }
  }
}
</style>

<template>
  <a-modal
    v-model="visible"
    :width="700"
    :class="b()"
    title="应用集合"
  >
    <a-spin :spinning="loading">
      <a-list
        :data-source="data"
        item-layout="horizontal"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          :class="{'root': item.env === 'root', 'focus': item.id === id}"
          class="ModalAttrEnvs__item"
        >
          <a-list-item-meta>
            <span slot="title">{{ item.title }}（{{ item.env }}）</span>
          </a-list-item-meta>

          <div style="width: 400px">
            <template v-if="item.id === id">
              <a-input
                v-if="item[attr][key]"
                v-model="item[attr][key].target"
                :placeholder="rootData[attr][key].target"

              />
            </template>
            <template v-else>
              <span>
                {{ item[attr][key].target }}
              </span>
            </template>
          </div>
          <template slot="actions">
            <!-- <a :disabled="item[attr][key].target !== rootData[attr][key].target">继承</a> -->
            <a href="">编辑</a>
          </template>
        </a-list-item>
      </a-list>
    </a-spin>
  </a-modal>
</template>

<script>
import create from '@/utils/create-basic'
import dialogBase from '@/mixins/dialogBase'

export default create({
  name: 'ModalAttrEnvs',

  mixins: [dialogBase],

  data() {
    return {
      loading: false,
      data: [],
      rootData: {},
      key: '',
      attr: '',
      id: Number(this.$route.params.id)
    }
  },

  watch: {
    $route(val) {
      this.id = this.$route.params.id
    }
  },

  methods: {
    async beforeOpen({ attr, key }) {
      this.loading = true
      const data = await this.Fetch.get('/api/v1/jobs', { name: 'console-v5-web', attr })
      const { list = [] } = data
      this.data = list
      this.attr = attr
      this.rootData = list.find(_ => _.env === 'root')
      this.key = key
      this.loading = false
    },

    handleSubmit() {

    }
  }
})
</script>
