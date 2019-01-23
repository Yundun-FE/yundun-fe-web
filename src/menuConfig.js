// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = []

const asideMenuConfig = [
  {
    path: '/dashboard',
    name: '控制台',
    icon: 'iconfont icon-dashboard'
  },
  {
    path: '/product',
    name: '项目',
    icon: 'iconfont icon-project'
  },
  // {
  //   path: '/setting',
  //   name: '配置',
  //   icon: 'el-icon-tickets'
  // },
  // {
  //   path: '/agents',
  //   name: '代理商管理',
  //   icon: 'el-icon-tickets'
  // },
  // {
  //   path: '/brands',
  //   name: '品牌管理',
  //   icon: 'el-icon-tickets'
  // },
  // {
  //   path: '/brandVersions',
  //   name: '品牌组',
  //   icon: 'el-icon-tickets'
  // },
  // {
  //   path: '/menus',
  //   name: '目录管理',
  //   icon: 'el-icon-tickets'
  // },
  {
    path: '/applications',
    name: '应用',
    icon: 'iconfont icon-appstore'
  },
  {
    path: '',
    name: '开发管理',
    icon: 'iconfont icon-build',
    children: [
      {
        path: '/account',
        name: '测试账号'
      },
      {
        path: '/cmd',
        name: '指令管理'
      },
      {
        path: '/website',
        name: '网站管理'
      }
    ]
  }
  // {
  //   path: '/appsPages',
  //   name: '页面管理',
  //   icon: 'el-icon-tickets'
  // }
]

export { headerMenuConfig, asideMenuConfig }
