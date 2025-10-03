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
    component: HomeIndex
  },
  {
    path: '/app',
    name: 'App',
    component: AppsPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/:catchAll(.*)', // Matches any path
    name: 'NotFound',
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
        routes.push({
          path: `/app/${appInfo.id}`,
          name: appInfo.id,
          component: appComponent,
          meta: {
            appInfo: appInfo
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

  createApp(App)
    .use(router)
    .mount('#app')
}

initApp()