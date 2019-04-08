<style lang="scss">
</style>

<template>
  <Modal ref="Modal" :fields="[ 'name', 'title', 'description']" title-label="配置">
    <template slot-scope="scope">
      <a-form>
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
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="配置类型"
        >
          <a-radio-group v-decorator="['type']" :options="TYPE" />
        </a-form-item>
      </a-form>
      <FormColumn ref="FormColumn" />
      <!--
          {

          }
         -->
    </template>
  </Modal>
</template>

<script>
import create from '@/utils/create-basic'
import FormColumn from './FormColumn'
import consoleModal from '@/mixins/consoleModal'

export default create({
  mixins: [consoleModal],

  components: { FormColumn },

  props: {},

  data() {
    return {
      TYPE: [
        {
          label: '单配置',
          value: 'single'
        },
        {
          label: '多配置',
          value: 'multiple'
        }
      ]
    }
  },

  computed: {},

  methods: {}
})
</script>
