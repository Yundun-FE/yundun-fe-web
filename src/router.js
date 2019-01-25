import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layouts/HeaderAsideLayout'

Vue.use(Router)

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

export const constantRouterMap = [
  {
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
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '控制台'
        },
        component: () => import('@/pages/dashboard/index'),
        children: [
          {
            path: '',
            name: 'dashboard',
            meta: {
              title: '所有项目'
            },
            component: () => import('@/pages/dashboard/list')
          }
        ]
      }
    ]
  },

  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '项目管理'
        },
        component: () => import('@/pages/product/index'),
        children: [
          {
            path: '',
            name: 'products',
            meta: {
              title: '所有项目'
            },
            component: () => import('@/pages/product/list')
          },
          {
            path: ':id',
            hidden: true,
            component: () => import('@/pages/product/detail'),
            children: [
              {
                path: '',
                redirect: 'info',
                name: 'products.id',
                hidden: true
              },
              {
                path: 'info',
                name: 'products.id.info',
                meta: {
                  title: '项目详情'
                },
                component: () => import('@/pages/product/info')
              },
              {
                path: 'menus',
                name: 'products.id.menus',
                meta: {
                  title: '目录配置'
                },
                component: () => import('@/pages/product/menu')
              },
              {
                path: 'build',
                name: 'products.id.build',
                meta: {
                  title: '编译配置'
                },
                component: () => import('@/pages/product/build')
              },
              {
                path: 'assets',
                name: 'products.id.assets',
                meta: {
                  title: '资源配置'
                },
                component: () => import('@/pages/product/assets')
              },
              {
                path: 'settings',
                name: 'products.id.settings',
                meta: {
                  title: '设置'
                },
                component: () => import('@/pages/product/setting')
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/applications',
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '应用管理'
        },
        component: () => import('@/pages/applications/index'),
        children: [
          {
            path: '',
            name: 'applications',
            meta: {
              title: '所有应用'
            },
            component: () => import('@/pages/applications/list')
          },
          {
            path: ':appId',
            meta: {
              title: '应用详情'
            },
            hidden: true,
            component: () => import('@/pages/applications/detail'),
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
                component: () => import('@/pages/applicationsPages/list'),
                meta: {
                  title: '页面管理'
                }
              },
              {
                path: 'pages/:pageId/edit',
                name: 'applications.appId.pagesId.edit',
                hidden: true,
                component: () => import('@/pages/applicationsPages/edit'),
                meta: {
                  title: '修改页面'
                }
              },
              {
                path: 'menus',
                name: 'applications.appId.menus',
                component: () => import('@/pages/applications/menu'),
                meta: {
                  title: '目录管理'
                }
              },
              {
                path: 'settings',
                name: 'applications.appId.settings',
                component: () => import('@/pages/applications/setting'),
                meta: {
                  title: '设置'
                }
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import('@/pages/account/index'),
        meta: {
          title: '账号管理'
        }
      }
    ]
  },

  {
    path: '/websites',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Website',
        component: () => import('@/pages/website/index'),
        meta: {
          title: '网站管理'
        }
      }
    ]
  },

  {
    path: '/progress',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Progress',
        component: () => import('@/pages/progress/index'),
        meta: {
          title: 'Progress'
        }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/pages/setting/index'),
        meta: {
          title: '配置'
        }
      }
    ]
  },

  {
    path: '/applicationsPages',
    component: Layout,
    children: [
      {
        path: '',
        name: 'applicationPage',
        component: () => import('@/pages/applicationsPages/list'),
        meta: {
          title: '页面管理'
        }
      },
      {
        path: ':id/edit',
        name: 'applicationPage__edit',
        component: () => import('@/pages/applicationsPages/edit')
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
