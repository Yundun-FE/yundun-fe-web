import Vue from 'vue'
window.Vue = Vue

// i18n
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'

const iMessages = {
  'en-US': {
    ...enLocale
  },
  'zh-CN': {
    ...zhLocale
  },
  'zh-TW': {
    ...twLocale
  }
}

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: iMessages
})

export default i18n
