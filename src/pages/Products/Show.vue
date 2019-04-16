
<template>
  <div>
    <PageHeader/>
    <!-- {{ productsData }} -->
    <a-row :gutter="12" class="margin-top">
      <a-col :span="12">
        <CardSettings @item-click="handleSettingsItemClick"/>
      </a-col>
    </a-row>
    <ModalMenus ref="ModalMenus" :fetch-submit="handleSubmitMenus"/>
  </div>
</template>

<script>
import productsMixin from '@/mixins/products'
import PageHeader from './components/PageHeader'
import CardSettings from './components/CardSettings'
import ModalMenus from './components/ModalMenus'

export default {
  components: { PageHeader, CardSettings, ModalMenus },

  mixins: [productsMixin],

  props: {},

  data() {
    return {}
  },

  computed: {},

  created() {
    this.PRODUCTS_SET_ID(this.$route.params.id)
    this.productsGetById()
  },

  methods: {
    handleSettingsItemClick() {
      this.$refs.ModalMenus.handleOpen()
    },

    handleSubmitMenus() {
      return this.productsSaveById()
    }
  }
}
</script>
