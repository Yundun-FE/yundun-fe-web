/**
 * Create a cudr component with common options
 */

import consolePage from '@/mixins/consolePage'
import consoleCudr from '@/mixins/consoleCudr'
import { isDef } from './'

const install = function(Vue) {
  Vue.component(this.name, this)
}

export default function(sfc) {
  sfc.install = sfc.install || install
  sfc.mixins = sfc.mixins || []
  sfc.mixins.push(consolePage, consoleCudr)

  sfc.props = {
    pageName: {
      type: String,
      default: sfc.pageName
    },
    apiName: {
      type: String,
      default: sfc.apiName
    }
  }

  sfc.methods = sfc.methods || {}
  sfc.methods.isDef = isDef

  return sfc
}
