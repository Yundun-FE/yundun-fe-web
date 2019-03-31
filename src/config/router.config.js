// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'
import { bxAnaalyse } from '@/core/icons'

const mainMap = [
  // dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    component: RouteView,
    meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'Analysis',
        meta: { title: '仪表盘', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/dashboard/index')
      }
    ]
  },
  {
    path: '/develop',
    redirect: '/develop/applications',
    meta: { title: '开发管理', icon: 'form', permission: ['form'] },
    component: PageView,
    children: [
      {
        path: '/develop/applications',
        name: 'applications',
        hideChildrenInMenu: true,
        meta: { title: '项目管理', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Applications/index')
      },
      {
        path: '/develop/项目管理/:id',
        name: '项目管理.appId',
        redirect: '/develop/项目管理/:id/settings',
        hideChildrenInMenu: false,
        meta: { title: '应用详情', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Applications/ShowLayout')
      },
      {
        path: '/develop/pages',
        name: 'applicationsPages',
        meta: { title: '页面管理' },
        component: () => import('@/pages/ApplicationsPages/index')
      },
      {
        path: '/develop/pages/:pageId/edit',
        name: 'applicationsPages.Id',
        hidden: true,
        meta: { title: '修改页面' },
        component: () => import('@/pages/ApplicationsPages/Show')
      },
      {
        path: '/develop/products',
        name: 'products',
        meta: { title: '应用管理', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Products/index')
      },
      {
        path: '/develop/products',
        name: 'products.id',
        meta: { title: '应用管理', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Products/ShowLayout'),
        hidden: true,
        children: [
          {
            path: '/develop/products/:id',
            redirect: '/develop/products/:id/menu',
            meta: { title: '目录管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/develop/products/:id/menu',
            name: 'products.id.menu',
            meta: { title: '目录管理', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Products/ShowMenu')
          },
          {
            path: '/develop/products/:id/build',
            name: 'products.id.build',
            meta: { title: '编译管理', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Products/ShowBuild')
          },
          {
            path: '/develop/products/:id/setting',
            name: 'products.id.setting',
            meta: { title: '项目配置', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Products/ShowSetting')
          },
          {
            path: '/develop/products/:id/assets',
            name: 'products.id.assets',
            meta: { title: '资源配置', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Products/ShowAssets')
          }
        ]
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: mainMap
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/RegisterResult')
      }
    ]
  },

  // {
  //   path: '/test',
  //   component: BlankLayout,
  //   redirect: '/test/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'TestHome',
  //       component: () => import('@/pages/Home')
  //     }
  //   ]
  // },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/pages/exception/404')
  }

]
