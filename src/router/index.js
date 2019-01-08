import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../pages/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/pages/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/pages/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  // hidden: true,
  children: [{
    path: 'dashboard',
    component: () => import('@/pages/dashboard/index'),
    meta: {
      title: '控制台'
    }
  }]
},

{
  path: '/product',
  component: Layout,
  hidden: true,
  children: [{
    path: 'index',
    name: 'Product',
    component: () => import('@/pages/product/index'),
    meta: {
      title: '项目管理'
    }
  },
  {
    path: 'id/:id',
    name: 'ProductDetail',
    component: () => import('@/pages/product/detail'),
    meta: {
      title: '项目详情'
    }
  },
  {
    path: 'id/:id/log',
    name: 'ProductLog',
    component: () => import('@/pages/product/log'),
    meta: {
      title: 'Log'
    }
  }
  ]
},

{
  path: '/account',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Account',
    component: () => import('@/pages/account/index'),
    meta: {
      title: '账号管理'
    }
  }]
},

{
  path: '/cmd',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Cmd',
    component: () => import('@/pages/cmd/index'),
    meta: {
      title: '命令管理'
    }
  }]
},

{
  path: '/website',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Website',
    component: () => import('@/pages/website/index'),
    meta: {
      title: '网站管理'
    }
  }]
},

{
  path: '/progress',
  component: Layout,
  hidden: true,
  children: [{
    path: 'index',
    name: 'Progress',
    component: () => import('@/pages/progress/index'),
    meta: {
      title: 'Progress'
    }
  }]
},

{
  path: '/setting',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Setting',
    component: () => import('@/pages/setting/index'),
    meta: {
      title: '配置'
    }
  }]
},

{
  path: '/agents',
  component: Layout,
  children: [{
    path: '',
    name: 'Agent',
    component: () => import('@/pages/agent/index'),
    meta: {
      title: '代理商管理'
    }
  }]
},

{
  path: '/brands',
  component: Layout,
  children: [{
    path: '',
    name: 'brand',
    component: () => import('@/pages/brand/index'),
    meta: {
      title: '品牌管理'
    }
  }]
},

{
  path: '/brandVersions',
  component: Layout,
  children: [{
    path: '',
    name: 'brandVersion',
    component: () => import('@/pages/brandVersion/index'),
    meta: {
      title: '品牌组'
    }
  }]
},

{
  path: '/menus',
  component: Layout,
  children: [{
    path: '',
    name: 'menu',
    component: () => import('@/pages/menu/index'),
    meta: {
      title: '目录管理'
    }
  }]
},

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
