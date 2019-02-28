import Page from './Page'
import PageTable from './PageTable'

Page.install = Vue => {
  Vue.component(Page.name, Page)
  Vue.component(PageTable.name, PageTable)
}

export default Page
