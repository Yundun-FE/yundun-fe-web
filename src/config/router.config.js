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
    redirect: '/develop/products',
    meta: { title: '开发', icon: 'form', permission: ['form'] },
    component: PageView,
    children: [
      {
        path: '/develop/products',
        name: 'products',
        meta: { title: '项目', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Products/index')
      },
      {
        path: '/develop/applications',
        name: 'applications',
        hideChildrenInMenu: true,
        meta: { title: '应用', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Applications/index')
      },
      {
        path: '/develop/applications',
        name: 'applications.id',
        meta: { title: '应用', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/pages/Applications/ShowLayout'),
        hidden: true,
        children: [
          {
            path: '/develop/applications/:id',
            redirect: '/develop/applications/:id/setting'
          },
          {
            path: '/develop/applications/:id/menu',
            name: 'applications.id.menu',
            meta: { title: '目录', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Applications/ShowMenu')
          },
          {
            path: '/develop/applications/:id/setting',
            name: 'applications.id.setting',
            meta: { title: '项目配置', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/pages/Applications/ShowSetting')
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
