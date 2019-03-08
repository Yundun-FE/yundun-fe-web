import Cookies from 'js-cookie'
import routerConfig from '@/routerConfig'
import LABEL from '@/utils/constants/label'
import { FE_API } from '../../config'

function genterMenuMap(routers, menus = {}) {
  let name = ''

  routers.forEach((router, index) => {
    if (index === 0) {
      name = router.name
      menus[name] = [router]
    } else {
      if (name) menus[name].push(router)
    }

    if (router.children) {
      genterMenuMap(router.children, menus)
    }
  })

  menus[name] = menus[name].filter(_ => !_.hidden)
  return menus
}

const app = {
  state: {
    routers: routerConfig,
    pageLoading: true,
    pageSkeleton: '',
    menus: genterMenuMap(routerConfig),
    LABEL: LABEL,
    tabs: {},
    FE_API,
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    SET_PAGE_SKELETON: (state, data) => {
      state.pageSkeleton = data
    },

    START_PAGE_LOADING: state => {
      state.pageLoading = true
    },

    FINISH_PAGE_LOADING: state => {
      state.pageLoading = false
    },

    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
