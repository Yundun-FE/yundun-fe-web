/**
 * Create a cudr component with common options
 */

import consolePage from '@/mixins/consolePage'
import consoleCudr from '@/mixins/consoleCudr'
import { isDef } from './'

export default function(sfc) {
  sfc.mixins = sfc.mixins || []
  sfc.mixins.push(consolePage, consoleCudr)

  sfc.data = function() {
    return {
      apiName: sfc.apiName
    }
  }

  sfc.methods = sfc.methods || {}
  sfc.methods.isDef = isDef
  return sfc
}
