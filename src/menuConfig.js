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
    path: '/products',
    name: '项目',
    icon: 'iconfont icon-project'
  },
  // {
  //   path: '/setting',
  //   name: '配置',
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
        path: '/accounts',
        name: '测试账号'
      },
      // {
      //   path: '/cmd',
      //   name: '指令管理'
      // },
      {
        path: '/websites',
        name: '常用网站'
      },
      {
        path: '/applicationsPages',
        name: '页面管理'
      }
    ]
  }
]

export { headerMenuConfig, asideMenuConfig }
