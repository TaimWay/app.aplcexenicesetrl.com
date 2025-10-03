import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import './assets/assets-theme.css'
import './assets/assets-fonts.css'
import './assets/assets-beautify.css'
import './assets/assets-beautify-ui.css'

import App from './App.vue'
import HomeIndex from './views/index.vue'
import AppsPage from './views/apps.vue'
import AboutPage from './views/about.vue'
import NotFound from './components/NotFound.vue'

// 动态导入所有应用组件
const appModules = import.meta.glob('./views/apps/*.vue')

// 创建路由
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {title: '首页 | Apps APlcexenicesetrl'},
    component: HomeIndex
  },
  {
    path: '/app',
    name: 'App',
    meta: {title: '应用列表 | Apps APlcexenicesetrl'},
    component: AppsPage
  },
  {
    path: '/about',
    name: 'About',
    meta: {title: '关于 | Apps APlcexenicesetrl'},
    component: AboutPage
  },
  {
    path: '/:catchAll(.*)', // Matches any path
    name: 'NotFound',
    meta: {title: '404 页面未找到 | Apps APlcexenicesetrl'},
    component: NotFound
  }
]

// 自动注册应用路由
const registerAppRoutes = async () => {
  for (const path in appModules) {
    try {
      const module = await appModules[path]()
      const appComponent = module.default
      
      if (appComponent.toolInfo) {
        const appInfo = appComponent.toolInfo
        const appTitle = appComponent.title
        routes.push({
          path: `/app/${appInfo.id}`,
          name: appInfo.id,
          component: appComponent,
          meta: {
            appInfo: appInfo,
            title: (appTitle != (void 0))?(appTitle + ' | Apps APlcexenicesetrl'):"未命名工具 | Apps APlcexenicesetrl"
          }
        })
        console.log(`Registered app: ${appInfo.name} (${appInfo.id})`)
      }
    } catch (error) {
      console.error(`Failed to load app from ${path}:`, error)
    }
  }
}

// 初始化应用
const initApp = async () => {
  await registerAppRoutes()
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })


  router.beforeEach((to,from,next)=>{//beforeEach是router的钩子函数，在进入路由前执行
      if(to.meta.title){//判断是否有标题
          document.title = to.meta.title
      }
      next()  //执行进入路由，如果不写就不会进入目标页
  })

  createApp(App)
    .use(router)
    .mount('#app')
}

initApp()