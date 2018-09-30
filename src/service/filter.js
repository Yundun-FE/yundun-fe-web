import { formatSeconds } from '@/utils/date'

const Filters = {
  formatSeconds
}

export function installFilter(Vue) {
  Object.keys(Filters).forEach(key => {
    Vue.filter(key, Filters[key])
  })
}
