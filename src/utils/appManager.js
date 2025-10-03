class AppManager {
  constructor() {
    this.apps = new Map()
    this.categories = new Map()
    this.initialized = false
  }

  // 注册应用
  registerApp(appInfo, component) {
    if (!appInfo || !appInfo.id) {
      console.warn('Invalid app info:', appInfo)
      return
    }

    this.apps.set(appInfo.id, {
      ...appInfo,
      component: component,
      fileName: this.extractFileName(component)
    })

    // 自动分类
    if (appInfo.category) {
      if (!this.categories.has(appInfo.category)) {
        this.categories.set(appInfo.category, [])
      }
      this.categories.get(appInfo.category).push(appInfo.id)
    }
  }

  // 从组件路径提取文件名
  extractFileName(component) {
    if (component.__file) {
      return component.__file.split('/').pop().replace('.vue', '')
    }
    return null
  }

  // 获取所有应用
  getAllApps() {
    return Array.from(this.apps.values())
  }

  // 获取分类应用
  getAppsByCategory(category) {
    if (category === 'all') {
      return this.getAllApps()
    }
    if (category === 'uncategorized') {
      return this.getAllApps().filter(app => !app.category)
    }
    return this.categories.has(category) 
      ? this.getAllApps().filter(app => this.categories.get(category).includes(app.id))
      : []
  }

  // 获取分类列表
  getCategories() {
    const categories = Array.from(this.categories.keys()).map(name => ({
      name,
      count: this.categories.get(name).length
    }))

    // 添加全部和未分类
    return [
      { name: 'all', displayName: '全部应用', count: this.getAllApps().length },
      ...categories,
      { name: 'uncategorized', displayName: '未分类', count: this.getAllApps().filter(app => !app.category).length }
    ]
  }

  // 搜索应用
  searchApps(query) {
    const searchTerm = query.toLowerCase()
    return this.getAllApps().filter(app => 
      app.name.toLowerCase().includes(searchTerm) ||
      app.description.toLowerCase().includes(searchTerm) ||
      (app.category && app.category.toLowerCase().includes(searchTerm))
    )
  }

  // 通过ID获取应用
  getAppById(id) {
    return this.apps.get(id)
  }
}

// 创建全局实例
const appManager = new AppManager()

export default appManager