import Layout from './layouts/HeaderAsideLayout'
import Login from './pages/Login'
import Base from './pages/Base/Base'

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

export const routerConfig = [
  {
    path: '/login',
    component: Login, // () => import('@/pages/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/pages/Base/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    meta: {
      title: '控制台'
    },
    component: Layout
    // component: () => import('@/pages/dashboard/index')
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
        component: Base,
        children: [
          {
            path: '',
            name: 'products',
            meta: {
              title: '所有项目'
            },
            component: () => import('@/pages/Products/index')
          },
          {
            path: ':id',
            hidden: true,
            component: () => import('@/pages/Products/Show'),
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
                component: () => import('@/pages/Products/ShowInfo')
              },
              {
                path: 'menus',
                name: 'products.id.menus',
                meta: {
                  title: '目录配置'
                },
                component: () => import('@/pages/Products/ShowMenu')
              },
              {
                path: 'build',
                name: 'products.id.build',
                meta: {
                  title: '编译配置'
                },
                component: () => import('@/pages/Products/ShowBuild')
              },
              {
                path: 'pages',
                name: 'products.id.pages',
                component: () => import('@/pages/ApplicationsPages/index'),
                meta: {
                  title: '页面管理'
                }
              },
              {
                path: 'pages/:productId/edit',
                name: 'products.id.pagesId.edit',
                hidden: true,
                component: () => import('@/pages/ApplicationsPages/Show'),
                meta: {
                  title: '修改页面'
                }
              },
              // {
              //   path: 'commands',
              //   name: 'products.id.commands',
              //   meta: {
              //     title: '指令管理'
              //   },
              //   component: () => import('@/pages/Products/ShowCommands')
              // },
              {
                path: 'assets',
                name: 'products.id.assets',
                meta: {
                  title: '资源配置'
                },
                component: () => import('@/pages/Products/ShowAssets')
              },
              {
                path: 'settings',
                name: 'products.id.settings',
                meta: {
                  title: '设置'
                },
                component: () => import('@/pages/Products/ShowSetting')
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
        component: Base,
        children: [
          {
            path: '',
            name: 'applications',
            meta: {
              title: '所有应用'
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
  },

  {
    path: '/accounts',
    component: Layout,
    children: [
      {
        path: '',
        name: 'accounts',
        component: () => import('@/pages/Accounts/index'),
        meta: {
          title: '账号管理'
        }
      }
    ]
  },

  {
    path: '/forms',
    component: Layout,
    children: [
      {
        path: '',
        name: 'forms',
        component: () => import('@/pages/Forms/index'),
        meta: {
          title: '表单管理'
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
        component: () => import('@/pages/Websites/index'),
        meta: {
          title: '网站管理'
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
        component: () => import('@/pages/Settings/index'),
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
        component: () => import('@/pages/ApplicationsPages/index'),
        meta: {
          title: '页面管理'
        }
      },
      {
        path: ':id/edit',
        name: 'applicationPage__edit',
        component: () => import('@/pages/ApplicationsPages/Show')
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default routerConfig
