import Vue from 'vue'
window.Vue = Vue

// i18n
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import Locale from './locale'

const iMessages = {
  'en-US': {
    ...Locale['en-US'],
    ...enLocale
  },
  'zh-CN': {
    ...Locale['zh-CN'],
    ...zhLocale
  },
  'zh-TW': {
    ...Locale['zh-TW'],
    ...twLocale
  }
}

console.log(iMessages)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: iMessages
})

export default i18n
