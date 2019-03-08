import Vue from 'vue'
import appMixins from '@/mixins/app'
import Antd from 'ant-design-vue'
import config from '@/config/defaultSettings'

import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import * as LABEL from '@/utils/constants/label'
import VueStorage from 'vue-ls'

import 'normalize.css/normalize.css'
import 'ant-design-vue/dist/antd.less'
import '@/components/global'
import '@/styles/index.scss'

// ui
import { installFilter } from '@/utils/filter'
import { installComponents } from '@/components'

Vue.use(VueStorage, config.storageOptions)

Vue.use(Antd)
Vue.mixin(appMixins)
installFilter(Vue)
installComponents(Vue)

Vue.prototype.Fetch = Fetch
Vue.prototype.LABEL = LABEL
Vue.prototype.Notice = Notice

