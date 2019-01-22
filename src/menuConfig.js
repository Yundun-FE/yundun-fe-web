// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = []

const asideMenuConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/',
        name: '控制台'
      }
    ]
  },
  {
    path: '/product',
    name: '项目管理',
    icon: 'el-icon-date',
    children: [
      {
        path: '/',
        name: '所有项目'
      }
    ]
  },
  {
    path: '/account',
    name: '账号管理',
    icon: 'el-icon-edit-outline'
  },
  {
    path: '/cmd',
    name: '命令管理',
    icon: 'el-icon-edit-outline'
  },
  {
    path: '/website',
    name: '网站管理',
    icon: 'el-icon-edit-outline'
  },
  {
    path: '/setting',
    name: '配置',
    icon: 'el-icon-tickets'
  },
  {
    path: '/agents',
    name: '代理商管理',
    icon: 'el-icon-tickets'
  },
  {
    path: '/brands',
    name: '品牌管理',
    icon: 'el-icon-tickets'
  },
  {
    path: '/brandVersions',
    name: '品牌组',
    icon: 'el-icon-tickets'
  },
  {
    path: '/menus',
    name: '目录管理',
    icon: 'el-icon-tickets'
  },
  {
    path: '/applications',
    name: '应用管理',
    icon: 'el-icon-tickets'
  },
  {
    path: '/appsPages',
    name: '页面管理',
    icon: 'el-icon-tickets'
  }
]

export { headerMenuConfig, asideMenuConfig }
