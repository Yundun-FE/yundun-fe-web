import HeaderTop from './HeaderTop'
import HeaderTab from './HeaderTab'

HeaderTop.install = Vue => {
  Vue.component(HeaderTop.name, HeaderTop)
  Vue.component(HeaderTab.name, HeaderTab)
}

export default HeaderTop
