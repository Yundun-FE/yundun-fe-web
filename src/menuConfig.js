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
  // {
  //   path: '/blocks',
  //   name: '区块',
  //   icon: 'iconfont icon-appstore'
  // },
  // {
  //   path: '/forms',
  //   name: '表单',
  //   icon: 'iconfont icon-appstore'
  // },
  {
    path: '/applicationsPages',
    name: '页面',
    icon: 'iconfont icon-appstore'
  },
  {
    path: 'dev',
    name: '开发管理',
    icon: 'iconfont icon-build',
    children: [
      {
        path: '/accounts',
        name: '测试账号'
      },
      {
        path: '/websites',
        name: '常用网站'
      }
    ]
  }
]

export { headerMenuConfig, asideMenuConfig }
