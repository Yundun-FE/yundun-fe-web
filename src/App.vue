<template>

  <VuePerfectScrollbar style="height: 100vh;">
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </VuePerfectScrollbar>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

export default {
  data() {
    return {
      locale: zhCN
    }
  },

  mounted() {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
