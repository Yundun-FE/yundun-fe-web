// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Analysis',
            component: () => import('@/pages/dashboard/index'),
            meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] }
          }
          // {
          //   path: '/dashboard/monitor',
          //   name: 'Monitor',
          //   hidden: true,
          //   component: () => import('@/views/dashboard/Monitor'),
          //   meta: { title: '监控页', keepAlive: true, permission: ['dashboard'] }
          // },
          // {
          //   path: '/dashboard/workplace',
          //   name: 'Workplace',
          //   component: () => import('@/views/dashboard/Workplace'),
          //   meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          // }
        ]
      },

      {
        path: '/applications',
        component: RouteView,
        children: [
          {
            path: '',
            meta: {
              title: '应用管理'
            },
            component: RouteView,
            children: [
              {
                path: '',
                name: 'applications',
                meta: {
                  title: '所有应用',
                  keepAlive: true,
                  skeleton: 'table'
                },
                component: () => import('@/pages/Applications/index')
              },
              {
                path: ':appId',
                meta: {
                  title: '应用详情'
                },
                hidden: true,
                component: () => import('@/pages/Applications/Show'),
                children: [
                  {
                    path: '',
                    name: 'applications.appId',
                    redirect: 'pages',
                    meta: {
                      title: '应用详情'
                    },
                    hidden: true
                  },
                  {
                    path: 'pages',
                    name: 'applications.appId.pages',
                    component: () => import('@/pages/ApplicationsPages/index'),
                    meta: {
                      title: '页面管理'
                    }
                  },
                  {
                    path: 'pages/:pageId/edit',
                    name: 'applications.appId.pagesId.edit',
                    hidden: true,
                    component: () => import('@/pages/ApplicationsPages/Show'),
                    meta: {
                      title: '修改页面'
                    }
                  },
                  {
                    path: 'menus',
                    name: 'applications.appId.menus',
                    component: () => import('@/pages/Applications/ShowMenu'),
                    meta: {
                      title: '目录管理'
                    }
                  },
                  {
                    path: 'settings',
                    name: 'applications.appId.settings',
                    component: () => import('@/pages/Applications/ShowSetting'),
                    meta: {
                      title: '设置'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
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
