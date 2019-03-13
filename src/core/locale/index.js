import zhCN from './lang/zh-CN'
// import twLocale from './lang/zh-TW'
import enUS from './lang/en-US'
import merge from 'deepmerge'

const lang = {
  'zh-CN': zhCN,
  'zh-TW': zhCN,
  'en-US': merge(zhCN, enUS)
}

export default lang
